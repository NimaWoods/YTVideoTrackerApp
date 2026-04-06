import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YoutubeService, VideoStats } from '../../services/youtube.service';
import { Observable } from 'rxjs';
import WidgetBridge from '../../services/widget-bridge';

@Component({
  selector: 'app-widget',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="widget-page">
      <h2>Widget Ansicht</h2>
      <p class="hint">Diese Ansicht ist optimiert für Widgets auf dem Home-Bildschirm.</p>
      
      <button (click)="syncWidget()" class="btn-sync">🔄 Widget aktualisieren</button>
      <p *ngIf="syncMessage" class="sync-message">{{ syncMessage }}</p>
      
      <div class="widget-grid">
        <div class="widget-card" *ngFor="let video of videos$ | async">
          <div class="widget-header">
            <img [src]="video.thumbnail" [alt]="video.title">
            <div class="widget-title">{{ video.title | slice:0:30 }}{{ video.title.length > 30 ? '...' : '' }}</div>
          </div>
          <div class="widget-body">
            <div class="view-count">{{ video.views | number }}</div>
            <div class="view-label">Views</div>
          </div>
          <div class="widget-footer">
            <span>{{ getLastUpdate(video.timestamp) }}</span>
          </div>
        </div>
      </div>

      <div *ngIf="(videos$ | async)?.length === 0" class="empty-widget">
        <p>Keine Videos zum Anzeigen.</p>
      </div>
    </div>
  `,
  styles: [`
    .widget-page { padding: 0.5rem; }
    .hint { color: #666; margin-bottom: 0.75rem; font-size: 0.85rem; }
    .widget-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem; }
    @media (min-width: 600px) {
      .widget-grid { grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); }
    }
    .widget-card { background: linear-gradient(135deg, #FF0000 0%, #cc0000 100%); color: white; border-radius: 12px; padding: 0.75rem; box-shadow: 0 4px 8px rgba(0,0,0,0.2); }
    .widget-header { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; }
    .widget-header img { width: 32px; height: 32px; border-radius: 4px; object-fit: cover; }
    .widget-title { font-size: 0.7rem; font-weight: 500; flex: 1; line-height: 1.2; }
    .widget-body { text-align: center; padding: 0.5rem 0; }
    .view-count { font-size: 1.5rem; font-weight: bold; }
    .view-label { font-size: 0.65rem; opacity: 0.8; }
    .widget-footer { text-align: center; font-size: 0.6rem; opacity: 0.7; margin-top: 0.25rem; }
    .btn-sync { background: #FF0000; color: white; border: none; padding: 0.75rem 1rem; border-radius: 4px; cursor: pointer; font-size: 0.9rem; margin-bottom: 1rem; width: 100%; }
    .sync-message { color: #28a745; font-size: 0.8rem; text-align: center; margin-bottom: 0.5rem; }
    .empty-widget { text-align: center; padding: 2rem; color: #666; }
  `]
})
export class WidgetComponent implements OnInit {
  videos$: Observable<VideoStats[]>;
  syncMessage: string = '';

  constructor(private youtubeService: YoutubeService) {
    this.videos$ = this.youtubeService.trackedVideos$;
  }

  ngOnInit() {}

  async syncWidget() {
    const videos = this.youtubeService.trackedVideos$;
    const currentVideos = await new Promise<VideoStats[]>(resolve => {
      videos.subscribe(v => resolve(v)).unsubscribe();
    });
    
    if (currentVideos.length > 0) {
      const topVideo = currentVideos[0];
      try {
        await WidgetBridge.updateWidgetData({
          videoTitle: topVideo.title,
          viewCount: topVideo.views,
          lastUpdate: new Date().toLocaleString('de-DE')
        });
        this.syncMessage = 'Widget aktualisiert!';
        setTimeout(() => this.syncMessage = '', 3000);
      } catch (err) {
        this.syncMessage = 'Fehler: ' + (err as Error).message;
      }
    } else {
      this.syncMessage = 'Keine Videos vorhanden';
    }
  }

  getLastUpdate(timestamp: Date): string {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 60000);
    
    if (diff < 1) return 'Gerade jetzt';
    if (diff < 60) return `Vor ${diff} Min`;
    if (diff < 1440) return `Vor ${Math.floor(diff / 60)} Std`;
    return `Vor ${Math.floor(diff / 1440)} Tagen`;
  }
}
