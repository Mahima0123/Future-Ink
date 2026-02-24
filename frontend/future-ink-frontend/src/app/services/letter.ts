import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Letter {
  id?: number;
  user?: number;
  title: string;
  body: string;
  created_at?: string;
  unlock_at: string;
  unlocked?: boolean;
  reflection?: string;
  mood?: string;
}

@Injectable({
  providedIn: 'root',
})
export class LetterService {

  private apiUrl = 'http://127.0.0.1:8000/api/letters/';

  constructor(private http: HttpClient) {}

  /** Get all letters of logged-in user */
  getLetters(): Observable<Letter[]> {
    return this.http.get<Letter[]>(this.apiUrl, {
      headers: this.authHeader() 
    });
  }

  /** Add a new letter */
  addLetter(letter: Letter): Observable<Letter> {
    return this.http.post<Letter>(this.apiUrl, letter, { headers: this.authHeader() });
  }

  updateLetter(id: number, data: Partial<Letter>): Observable<Letter> {
    return this.http.patch<Letter>(
      `${this.apiUrl}${id}/`,
      data,
      { headers: this.authHeader() }
    );
  }

  /** Get unlocked letters */
  getUnlockedLetters(): Observable<Letter[]> {
    return this.http.get<Letter[]>(
      `${this.apiUrl}unlocked/`,
      { headers: this.authHeader() }
    );
  }

  /** Attach JWT token for authentication */
  private authHeader(): { [header: string]: string } {
    if (typeof window === 'undefined') {
      return {}; // Safe for SSR / server context
    }
    const token = window.localStorage.getItem('token');
    if (token) {
      return { Authorization: `Bearer ${token}` };
    }
    return {};
  }
}
