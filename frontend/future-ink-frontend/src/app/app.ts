import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Dashboard } from './components/dashboard/dashboard';
import { LetterForm } from './components/letter-form/letter-form';


@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
  ]
})
export class App {
  protected readonly title = signal('future-ink-frontend');
}
