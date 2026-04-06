import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent) },
  { path: 'videos', loadComponent: () => import('./components/videos/videos.component').then(m => m.VideosComponent) },
  { path: 'stats', loadComponent: () => import('./components/stats/stats.component').then(m => m.StatsComponent) },
  { path: 'widget', loadComponent: () => import('./components/widget/widget.component').then(m => m.WidgetComponent) }
];
