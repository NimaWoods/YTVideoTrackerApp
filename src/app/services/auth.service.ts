import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  id: string;
  name: string;
  email: string;
  photoUrl: string;
  accessToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUser.asObservable();

  constructor() {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage() {
    const stored = localStorage.getItem('user');
    if (stored) {
      this.currentUser.next(JSON.parse(stored));
    }
  }

  setUser(user: User | null) {
    this.currentUser.next(user);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }

  getUser(): User | null {
    return this.currentUser.value;
  }

  isLoggedIn(): boolean {
    return this.currentUser.value !== null;
  }

  logout() {
    this.setUser(null);
    localStorage.removeItem('youtube_api_key');
  }

  saveApiKey(key: string) {
    localStorage.setItem('youtube_api_key', key);
  }

  getApiKey(): string | null {
    return localStorage.getItem('youtube_api_key');
  }
}
