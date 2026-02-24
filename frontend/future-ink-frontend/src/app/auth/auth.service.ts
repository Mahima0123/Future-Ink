import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URL = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  /* ===============================
     ✅ Browser Safety (SSR FIX)
  =============================== */
  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  /* ===============================
     REGISTER
  =============================== */
  register(data: any): Observable<any> {
    return this.http.post(`${this.API_URL}/register/`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.API_URL}/token/`, data);
  }

  saveToken(access: string, refresh: string) {
    if (!this.isBrowser()) return;

    window.localStorage.setItem('token', access);
    window.localStorage.setItem('refresh', refresh);
  }

  getToken(): string | null {
    if (!this.isBrowser()) return null;

    return window.localStorage.getItem('token');
  }

  logout(): Observable<any> {
    const refresh = this.isBrowser()
      ? window.localStorage.getItem('refresh')
      : null;

    return this.http.post(`${this.API_URL}/logout/`, {
      refresh: refresh
    });
  }
  clearSession() {
    if (!this.isBrowser()) return;

    window.localStorage.removeItem('token');
    window.localStorage.removeItem('refresh');
  }
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

}
