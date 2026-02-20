import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Letter, LetterService } from '../../services/letter';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class Dashboard {
  letters: Letter[] = [];
  successMessage = '';
  menuOpen = false;

  newLetter: Partial<Letter> = {
    title: '',
    body: '',
    unlock_at: ''
  };

  constructor(
    private letterService: LetterService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined' && !this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    if (typeof window !== 'undefined') {
      this.loadLetters();
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }


  loadLetters() {
    this.letterService.getLetters().subscribe({
      next: (data: Letter[]) => this.letters = data,
      error: (err) => console.error('Failed to load letters:', err)
    });
  }

  submitLetter() {
    if (!this.newLetter.title || !this.newLetter.body || !this.newLetter.unlock_at) return;

    this.letterService.addLetter(this.newLetter as Letter).subscribe({
      next: (res) => {
        this.successMessage = '✅ Letter submitted!';
        this.newLetter = { title: '', body: '', unlock_at: '' };
        this.loadLetters(); // refresh list
        setTimeout(() => this.successMessage = '', 3000); // hide after 3 sec
      },
      error: (err) => {
        console.error(err);
        alert('Failed to submit letter');
      }
    });
  }
  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
