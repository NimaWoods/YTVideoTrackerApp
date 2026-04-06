import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartConfiguration, ChartOptions, registerables } from 'chart.js';
import { YoutubeService, VideoStats } from '../../services/youtube.service';
import { Observable } from 'rxjs';

Chart.register(...registerables);

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  template: `
    <div class="stats-page">
      <h2>Statistiken</h2>
      
      <div class="stats-grid">
        <div class="stat-card" *ngFor="let video of videos$ | async">
          <h3>{{ video.title }}</h3>
          
          <div class="metrics">
            <div class="metric">
              <span class="metric-label">Views letztes Jahr:</span>
              <span class="metric-value">{{ getViewsLastYear(video.videoId) | number }}</span>
            </div>
            <div class="metric">
              <span class="metric-label">Views letzter Monat:</span>
              <span class="metric-value">{{ getViewsLastMonth(video.videoId) | number }}</span>
            </div>
            <div class="metric">
              <span class="metric-label">Aktuelle Views:</span>
              <span class="metric-value">{{ video.views | number }}</span>
            </div>
            <div class="metric">
              <span class="metric-label">Likes:</span>
              <span class="metric-value">{{ video.likes | number }}</span>
            </div>
            <div class="metric">
              <span class="metric-label">Comments:</span>
              <span class="metric-value">{{ video.comments | number }}</span>
            </div>
          </div>

          <div class="chart-container">
            <canvas baseChart
              [data]="getChartData(video.videoId)"
              [options]="chartOptions"
              [type]="'line'">
            </canvas>
          </div>
        </div>
      </div>

      <div *ngIf="(videos$ | async)?.length === 0" class="empty-state">
        <p>Keine Videos zum Anzeigen von Statistiken.</p>
      </div>
    </div>
  `,
  styles: [`
    .stats-page { padding: 0.5rem; }
    .stats-grid { display: grid; grid-template-columns: 1fr; gap: 1rem; }
    @media (min-width: 600px) {
      .stats-grid { grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); }
    }
    .stat-card { background: white; padding: 1rem; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .stat-card h3 { margin: 0 0 0.75rem 0; font-size: 0.95rem; color: #333; }
    .metrics { margin-bottom: 1rem; }
    .metric { display: flex; justify-content: space-between; padding: 0.4rem 0; border-bottom: 1px solid #eee; font-size: 0.85rem; }
    .metric-label { color: #666; }
    .metric-value { font-weight: bold; color: #FF0000; }
    .chart-container { height: 200px; }
    .empty-state { text-align: center; padding: 2rem; color: #666; }
  `]
})
export class StatsComponent implements OnInit {
  videos$: Observable<VideoStats[]>;
  
  chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: 'top' }
    },
    scales: {
      y: { beginAtZero: true }
    }
  };

  constructor(private youtubeService: YoutubeService) {
    this.videos$ = this.youtubeService.trackedVideos$;
  }

  ngOnInit() {}

  getViewsLastYear(videoId: string): number {
    return this.youtubeService.getViewsLastYear(videoId);
  }

  getViewsLastMonth(videoId: string): number {
    return this.youtubeService.getViewsLastMonth(videoId);
  }

  getChartData(videoId: string): ChartConfiguration['data'] {
    const data = this.youtubeService.getHistoricalData(videoId);
    const labels = data.map(d => new Date(d.date).toLocaleDateString('de-DE', { month: 'short', day: 'numeric' }));
    const views = data.map(d => d.views);

    return {
      labels: labels.length > 0 ? labels : ['Keine Daten'],
      datasets: [{
        label: 'Views über Zeit',
        data: views.length > 0 ? views : [0],
        borderColor: '#FF0000',
        backgroundColor: 'rgba(255, 0, 0, 0.1)',
        fill: true,
        tension: 0.4
      }]
    };
  }
}
