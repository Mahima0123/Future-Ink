import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URL = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  register(data: any): Observable<any> {
    return this.http.post(`${this.API_URL}/register/`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.API_URL}/token/`, data);
  }

  saveToken(access: string, refresh: string) {
    localStorage.setItem('token', access);
    localStorage.setItem('refresh', refresh);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout(): Observable<any> {
    const refresh = localStorage.getItem('refresh');

    return this.http.post(`${this.API_URL}/logout/`, {
      refresh: refresh
    });
  }
  clearSession() {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh');
  }
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

}
