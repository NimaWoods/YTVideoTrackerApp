import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, interval } from 'rxjs';
import { switchMap, catchError, tap } from 'rxjs/operators';
import WidgetBridge from './widget-bridge';

export interface VideoStats {
  videoId: string;
  title: string;
  thumbnail: string;
  views: number;
  likes: number;
  comments: number;
  timestamp: Date;
}

export interface ChannelStats {
  channelId: string;
  title: string;
  thumbnail: string;
  subscribers: number;
  videoCount: number;
  viewCount: number;
  timestamp: Date;
}

export interface HistoricalData {
  date: Date;
  views: number;
  subscribers?: number;
}

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  private apiKey: string = '';
  private trackedVideos: BehaviorSubject<VideoStats[]> = new BehaviorSubject<VideoStats[]>([]);
  private historicalData: Map<string, HistoricalData[]> = new Map();

  public trackedVideos$ = this.trackedVideos.asObservable();

  constructor(private http: HttpClient) {
    this.loadStoredData();
  }

  setApiKey(key: string) {
    this.apiKey = key;
  }

  getApiKey(): string {
    return this.apiKey;
  }

  private loadStoredData() {
    const stored = localStorage.getItem('trackedVideos');
    if (stored) {
      this.trackedVideos.next(JSON.parse(stored));
    }
    const historical = localStorage.getItem('historicalData');
    if (historical) {
      this.historicalData = new Map(JSON.parse(historical));
    }
  }

  private saveData() {
    localStorage.setItem('trackedVideos', JSON.stringify(this.trackedVideos.value));
    localStorage.setItem('historicalData', JSON.stringify([...this.historicalData]));
  }

  getVideoStats(videoId: string): Observable<any> {
    const url = `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${videoId}&key=${this.apiKey}`;
    return this.http.get(url);
  }

  getChannelStats(channelId: string): Observable<any> {
    const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id=${channelId}&key=${this.apiKey}`;
    return this.http.get(url);
  }

  extractVideoId(url: string): string | null {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  }

  addVideo(videoId: string, title: string, thumbnail: string, views: number, likes: number, comments: number) {
    const current = this.trackedVideos.value;
    const existingIndex = current.findIndex(v => v.videoId === videoId);
    
    const newStats: VideoStats = {
      videoId,
      title,
      thumbnail,
      views,
      likes,
      comments,
      timestamp: new Date()
    };

    if (existingIndex >= 0) {
      current[existingIndex] = newStats;
    } else {
      current.push(newStats);
    }

    this.trackedVideos.next([...current]);
    this.saveHistoricalData(videoId, views);
    this.saveData();
    this.updateWidget();
  }

  removeVideo(videoId: string) {
    const current = this.trackedVideos.value.filter(v => v.videoId !== videoId);
    this.trackedVideos.next(current);
    this.historicalData.delete(videoId);
    this.saveData();
    this.updateWidget();
  }

  private updateWidget() {
    const videos = this.trackedVideos.value;
    if (videos.length > 0) {
      const topVideo = videos[0];
      WidgetBridge.updateWidgetData({
        videoTitle: topVideo.title,
        viewCount: topVideo.views,
        lastUpdate: new Date().toLocaleString('de-DE')
      }).catch(err => console.log('Widget update failed:', err));
    }
  }

  private saveHistoricalData(videoId: string, views: number) {
    if (!this.historicalData.has(videoId)) {
      this.historicalData.set(videoId, []);
    }
    const data = this.historicalData.get(videoId)!;
    data.push({
      date: new Date(),
      views: views
    });
    // Keep only last 365 days of data
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    const filtered = data.filter(d => new Date(d.date) > oneYearAgo);
    this.historicalData.set(videoId, filtered);
  }

  getHistoricalData(videoId: string): HistoricalData[] {
    return this.historicalData.get(videoId) || [];
  }

  getViewsLastYear(videoId: string): number {
    const data = this.getHistoricalData(videoId);
    if (data.length < 2) return 0;
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    const oldData = data.find(d => new Date(d.date) <= oneYearAgo);
    const current = data[data.length - 1];
    if (!oldData) return 0;
    return current.views - oldData.views;
  }

  getViewsLastMonth(videoId: string): number {
    const data = this.getHistoricalData(videoId);
    if (data.length < 2) return 0;
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    const oldData = data.find(d => new Date(d.date) <= oneMonthAgo);
    const current = data[data.length - 1];
    if (!oldData) return 0;
    return current.views - oldData.views;
  }

  startAutoUpdate(): Observable<any> {
    // Update every hour (3600000 ms)
    return interval(3600000).pipe(
      switchMap(() => this.updateAllVideos())
    );
  }

  updateAllVideos(): Observable<any> {
    const videos = this.trackedVideos.value;
    if (videos.length === 0 || !this.apiKey) {
      return new Observable(observer => observer.complete());
    }

    const videoIds = videos.map(v => v.videoId).join(',');
    return this.getVideoStats(videoIds).pipe(
      tap((response: any) => {
        if (response.items) {
          response.items.forEach((item: any) => {
            const stats = item.statistics;
            this.addVideo(
              item.id,
              item.snippet.title,
              item.snippet.thumbnails.default.url,
              parseInt(stats.viewCount, 10),
              parseInt(stats.likeCount, 10),
              parseInt(stats.commentCount, 10)
            );
          });
        }
      }),
      catchError(error => {
        console.error('Error updating videos:', error);
        throw error;
      })
    );
  }
}
