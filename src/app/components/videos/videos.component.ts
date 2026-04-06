import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { YoutubeService, VideoStats } from '../../services/youtube.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-videos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="videos-page">
      <h2>Video Verwaltung</h2>
      
      <div class="add-video">
        <input type="text" [(ngModel)]="videoUrl" placeholder="YouTube Video URL eingeben" class="url-input">
        <button (click)="addVideo()" class="btn-add">Video hinzufügen</button>
      </div>

      <div class="video-list">
        <div class="video-item" *ngFor="let video of videos$ | async">
          <img [src]="video.thumbnail" [alt]="video.title">
          <div class="video-details">
            <h4>{{ video.title }}</h4>
            <p>ID: {{ video.videoId }}</p>
            <p>Views: {{ video.views | number }}</p>
            <p>Zuletzt aktualisiert: {{ video.timestamp | date:'short' }}</p>
          </div>
          <button (click)="removeVideo(video.videoId)" class="btn-remove">Entfernen</button>
        </div>
      </div>

      <div *ngIf="(videos$ | async)?.length === 0" class="empty-state">
        <p>Noch keine Videos getrackt. Fügen Sie ein Video hinzu!</p>
      </div>
    </div>
  `,
  styles: [`
    .videos-page { padding: 0.5rem; }
    .add-video { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1rem; }
    @media (min-width: 600px) {
      .add-video { flex-direction: row; }
    }
    .url-input { flex: 1; padding: 0.75rem; border: 1px solid #ddd; border-radius: 4px; font-size: 1rem; width: 100%; box-sizing: border-box; }
    .btn-add { background: #FF0000; color: white; border: none; padding: 0.75rem 1rem; border-radius: 4px; cursor: pointer; font-size: 0.9rem; }
    .video-list { display: flex; flex-direction: column; gap: 0.75rem; }
    .video-item { display: flex; gap: 0.5rem; background: white; padding: 0.75rem; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); align-items: center; }
    .video-item img { width: 80px; height: 60px; object-fit: cover; border-radius: 4px; flex-shrink: 0; }
    .video-details { flex: 1; min-width: 0; }
    .video-details h4 { margin: 0 0 0.25rem 0; font-size: 0.85rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .video-details p { margin: 0.15rem 0; color: #666; font-size: 0.75rem; }
    .btn-remove { background: #dc3545; color: white; border: none; padding: 0.4rem 0.75rem; border-radius: 4px; cursor: pointer; font-size: 0.8rem; flex-shrink: 0; }
    .empty-state { text-align: center; padding: 2rem; color: #666; }
  `]
})
export class VideosComponent {
  videoUrl: string = '';
  videos$: Observable<VideoStats[]>;
  error: string = '';

  constructor(private youtubeService: YoutubeService) {
    this.videos$ = this.youtubeService.trackedVideos$;
  }

  addVideo() {
    const videoId = this.youtubeService.extractVideoId(this.videoUrl);
    if (!videoId) {
      this.error = 'Ungültige YouTube URL';
      return;
    }

    this.youtubeService.getVideoStats(videoId).subscribe({
      next: (response: any) => {
        if (response.items && response.items.length > 0) {
          const item = response.items[0];
          const stats = item.statistics;
          this.youtubeService.addVideo(
            videoId,
            item.snippet.title,
            item.snippet.thumbnails.default?.url || '',
            parseInt(stats.viewCount, 10) || 0,
            parseInt(stats.likeCount, 10) || 0,
            parseInt(stats.commentCount, 10) || 0
          );
          this.videoUrl = '';
          this.error = '';
        }
      },
      error: (err) => {
        this.error = 'Fehler beim Laden der Video-Daten';
        console.error(err);
      }
    });
  }

  removeVideo(videoId: string) {
    this.youtubeService.removeVideo(videoId);
  }
}
