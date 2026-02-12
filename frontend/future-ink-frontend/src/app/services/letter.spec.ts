import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  providedIn: 'root'
})
export class LetterService {

  private apiUrl = 'http://127.0.0.1:8000/api/letters/';

  constructor(private http: HttpClient) { }

  getLetters(): Observable<Letter[]> {
    return this.http.get<Letter[]>(this.apiUrl);
  }

  addLetter(letter: Letter): Observable<Letter> {
    return this.http.post<Letter>(this.apiUrl, letter);
  }
}
