import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YoutubeService, VideoStats } from '../../services/youtube.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard">
      <h2>Dashboard</h2>
      
      <div class="stats-overview">
        <div class="stat-card">
          <h3>Getrackte Videos</h3>
          <p class="stat-value">{{ (videos$ | async)?.length || 0 }}</p>
        </div>
        <div class="stat-card">
          <h3>Gesamt Views</h3>
          <p class="stat-value">{{ getTotalViews() | number }}</p>
        </div>
        <div class="stat-card">
          <h3>Gesamt Likes</h3>
          <p class="stat-value">{{ getTotalLikes() | number }}</p>
        </div>
      </div>

      <div class="last-update">
        <p>Letztes Update: {{ lastUpdate | date:'medium' }}</p>
        <button (click)="manualUpdate()" class="btn-update">Jetzt aktualisieren</button>
      </div>

      <div class="videos-grid">
        <div class="video-card" *ngFor="let video of videos$ | async">
          <img [src]="video.thumbnail" [alt]="video.title">
          <div class="video-info">
            <h4>{{ video.title }}</h4>
            <p>Views: {{ video.views | number }}</p>
            <p>Likes: {{ video.likes | number }}</p>
            <p>Comments: {{ video.comments | number }}</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard { padding: 0.5rem; }
    .stats-overview { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; margin-bottom: 1rem; }
    .stat-card { background: white; padding: 0.75rem; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); text-align: center; }
    .stat-card h3 { margin: 0 0 0.25rem 0; color: #666; font-size: 0.7rem; }
    .stat-value { font-size: 1.25rem; font-weight: bold; color: #FF0000; margin: 0; }
    .last-update { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1rem; padding: 0.75rem; background: white; border-radius: 8px; }
    .btn-update { background: #FF0000; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; font-size: 0.85rem; }
    .videos-grid { display: grid; grid-template-columns: 1fr; gap: 0.75rem; }
    @media (min-width: 600px) {
      .videos-grid { grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); }
      .stats-overview { grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); }
    }
    .video-card { background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .video-card img { width: 100%; height: auto; aspect-ratio: 16/9; object-fit: cover; }
    .video-info { padding: 0.75rem; }
    .video-info h4 { margin: 0 0 0.25rem 0; font-size: 0.9rem; }
    .video-info p { margin: 0.15rem 0; color: #666; font-size: 0.8rem; }
  `]
})
export class DashboardComponent implements OnInit {
  videos$: Observable<VideoStats[]>;
  lastUpdate: Date = new Date();

  constructor(private youtubeService: YoutubeService) {
    this.videos$ = this.youtubeService.trackedVideos$;
  }

  ngOnInit() {
    this.youtubeService.startAutoUpdate().subscribe();
  }

  getTotalViews(): number {
    let total = 0;
    this.videos$.subscribe(videos => {
      total = videos.reduce((sum, v) => sum + v.views, 0);
    }).unsubscribe();
    return total;
  }

  getTotalLikes(): number {
    let total = 0;
    this.videos$.subscribe(videos => {
      total = videos.reduce((sum, v) => sum + v.likes, 0);
    }).unsubscribe();
    return total;
  }

  manualUpdate() {
    this.youtubeService.updateAllVideos().subscribe(() => {
      this.lastUpdate = new Date();
    });
  }
}
