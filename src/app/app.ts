import { Component, OnInit, OnDestroy, inject, PLATFORM_ID, NgZone } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService, User } from './services/auth.service';
import { YoutubeService } from './services/youtube.service';
import { FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

declare const google: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="app-container">
      <header class="app-header">
        <h1>YouTube Video Tracker</h1>
        <div class="user-section" *ngIf="apiKey">
          <button (click)="logout()" class="btn-logout">API Key löschen</button>
        </div>
      </header>

      <main class="app-content">
        <!-- API Key Eingabe wenn noch keiner gespeichert -->
        <div *ngIf="!apiKey" class="api-key-container">
          <div class="api-key-card">
            <h2>YouTube Video Tracker</h2>
            <p>Bitte geben Sie Ihren YouTube Data API v3 Key ein:</p>
            <input type="text" [(ngModel)]="apiKeyInput" placeholder="API Key" class="api-input">
            <button (click)="saveApiKey()" class="btn-primary">App starten</button>
            <p class="hint">
              Hinweis: Sie können einen API Key in der
              <a href="https://console.cloud.google.com/" target="_blank">Google Cloud Console</a> erstellen.
            </p>
            <div class="legal-links-footer">
              <a routerLink="/impressum">Impressum</a>
              <span class="separator">|</span>
              <a routerLink="/privacy">Datenschutz</a>
              <span class="separator">|</span>
              <a routerLink="/terms">Nutzungsbedingungen</a>
            </div>
          </div>
        </div>

        <!-- Haupt-App wenn API Key vorhanden -->
        <div *ngIf="apiKey" class="main-content">
          <nav class="nav-tabs">
            <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
            <a routerLink="/videos" routerLinkActive="active">Videos</a>
            <a routerLink="/stats" routerLinkActive="active">Statistiken</a>
            <a routerLink="/widget" routerLinkActive="active">Widget</a>
          </nav>
          <router-outlet></router-outlet>
          <footer class="app-footer">
            <div class="legal-links">
              <a routerLink="/impressum">Impressum</a>
              <span class="separator">|</span>
              <a routerLink="/privacy">Datenschutz</a>
              <span class="separator">|</span>
              <a routerLink="/terms">Nutzungsbedingungen</a>
            </div>
          </footer>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .app-container { min-height: 100vh; background: #f5f5f5; }
    .app-header { background: #FF0000; color: white; padding: 0.75rem 1rem; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .app-header h1 { margin: 0; font-size: 1.2rem; }
    .user-section { display: flex; align-items: center; gap: 1rem; }
    .user-avatar { width: 32px; height: 32px; border-radius: 50%; object-fit: cover; }
    .btn-logout { background: rgba(255,255,255,0.2); border: 1px solid white; color: white; padding: 0.4rem 0.75rem; border-radius: 4px; cursor: pointer; font-size: 0.8rem; }
    .app-content { padding: 0.5rem; }
    .login-container, .api-key-container { display: flex; justify-content: center; align-items: center; min-height: 60vh; padding: 0 1rem; }
    .login-card, .api-key-card { background: white; padding: 1.5rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); text-align: center; max-width: 100%; width: 100%; }
    .api-input { width: 100%; padding: 0.75rem; margin: 1rem 0; border: 1px solid #ddd; border-radius: 4px; font-size: 1rem; box-sizing: border-box; }
    .btn-primary { background: #FF0000; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 4px; cursor: pointer; font-size: 1rem; width: 100%; }
    .hint { margin-top: 1rem; font-size: 0.8rem; color: #666; }
    .nav-tabs { display: flex; flex-wrap: wrap; gap: 0.25rem; margin-bottom: 1rem; background: white; padding: 0.5rem; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); justify-content: center; }
    .nav-tabs a { text-decoration: none; color: #666; padding: 0.5rem 0.6rem; border-radius: 4px; transition: all 0.2s; font-size: 0.8rem; white-space: nowrap; }
    .nav-tabs a:hover { color: #FF0000; }
    .nav-tabs a.active { background: #FF0000; color: white; }
    .main-content { max-width: 1200px; margin: 0 auto; }
    .btn-google { display: flex; align-items: center; justify-content: center; background: white; border: 1px solid #ddd; padding: 12px 24px; border-radius: 4px; cursor: pointer; font-size: 16px; margin-top: 1rem; box-shadow: 0 1px 2px rgba(0,0,0,0.1); }
    .app-footer { margin-top: 2rem; padding: 1rem; text-align: center; border-top: 1px solid #ddd; }
    .legal-links { display: flex; justify-content: center; align-items: center; gap: 0.5rem; font-size: 0.85rem; }
    .legal-links a { color: #666; text-decoration: none; }
    .legal-links a:hover { color: #FF0000; text-decoration: underline; }
    .legal-links .separator { color: #ccc; }
    .legal-links-footer { margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid #eee; display: flex; justify-content: center; align-items: center; gap: 0.5rem; font-size: 0.8rem; }
    .legal-links-footer a { color: #666; text-decoration: none; }
    .legal-links-footer a:hover { color: #FF0000; text-decoration: underline; }
    .legal-links-footer .separator { color: #ccc; }
  `]
})
export class App implements OnInit, OnDestroy {
  user: User | null = null;
  apiKey: string | null = null;
  apiKeyInput: string = '';
  isCapacitor: boolean = false;
  private subscriptions: Subscription[] = [];
  private platformId = inject(PLATFORM_ID);

  constructor(
    private authService: AuthService,
    private youtubeService: YoutubeService,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.authService.currentUser$.subscribe(user => {
        this.user = user;
      })
    );

    this.apiKey = this.authService.getApiKey() || environment.youtubeApiKey;
    if (this.apiKey) {
      this.youtubeService.setApiKey(this.apiKey);
    }

    if (isPlatformBrowser(this.platformId)) {
      this.initAuth();
    }
  }

  private async initAuth() {
    this.isCapacitor = 'Capacitor' in window;
    if (this.isCapacitor) {
      await GoogleAuth.initialize();
    } else {
      setTimeout(() => this.initGoogleSignIn(), 1000);
    }
  }

  async nativeGoogleSignIn() {
    console.log('Starting native Google Sign-In...');
    try {
      const result = await GoogleAuth.signIn();
      console.log('Google Auth result:', result);
      
      if (!result || !result.authentication) {
        console.error('Invalid auth result:', result);
        return;
      }
      
      const user: User = {
        id: result.id || '',
        name: result.name || '',
        email: result.email || '',
        photoUrl: result.imageUrl || '',
        accessToken: result.authentication.accessToken || ''
      };
      
      console.log('Setting user:', user);
      this.ngZone.run(() => {
        this.authService.setUser(user);
        console.log('User set in auth service');
      });
    } catch (error) {
      console.error('Native Google Sign-In failed:', error);
      alert('Login fehlgeschlagen: ' + JSON.stringify(error));
    }
  }

  private initGoogleSignIn() {
    if (isPlatformBrowser(this.platformId) && typeof google !== 'undefined' && google.accounts) {
      google.accounts.id.initialize({
        client_id: environment.googleClientId,
        callback: this.handleCredentialResponse.bind(this),
      });
      const button = document.getElementById('google-signin-button');
      if (button) {
        google.accounts.id.renderButton(button, { theme: 'outline', size: 'large' });
      }
    }
  }

  private handleCredentialResponse(response: any) {
    const payload = JSON.parse(atob(response.credential.split('.')[1]));
    const user: User = {
      id: payload.sub,
      name: payload.name,
      email: payload.email,
      photoUrl: payload.picture,
      accessToken: response.credential
    };
    this.ngZone.run(() => {
      this.authService.setUser(user);
    });
  }

  saveApiKey() {
    if (this.apiKeyInput) {
      this.authService.saveApiKey(this.apiKeyInput);
      this.youtubeService.setApiKey(this.apiKeyInput);
      this.apiKey = this.apiKeyInput;
    }
  }

  logout() {
    this.authService.logout();
    this.apiKey = null;
    if (isPlatformBrowser(this.platformId) && typeof google !== 'undefined' && google.accounts) {
      google.accounts.id.disableAutoSelect();
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
