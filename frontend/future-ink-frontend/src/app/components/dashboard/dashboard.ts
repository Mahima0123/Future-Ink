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
  showUnlockedModal = false;
  currentView: 'write' | 'unlocked' = 'write';
  modalType: 'locked' | 'unlocked' = 'unlocked';
  selectedLetterId: number | null = null;
  reflectionText = '';
  selectedMood = '';
  

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
    this.auth.logout().subscribe({
      next: () => {
        this.auth.clearSession();
        this.router.navigate(['/login']);
      },
      error: () => {
        this.auth.clearSession();
        this.router.navigate(['/login']);
      }
    });
  }

  openUnlockedLetters() {
    this.modalType = 'unlocked';
    this.showUnlockedModal = true;

    this.letterService.getUnlockedLetters().subscribe({
      next: (data) => this.letters = data,
      error: (err) => console.error(err)
    });
  }

  openLockedLetters() {
    this.modalType = 'locked';
    this.showUnlockedModal = true;

    this.letterService.getLetters().subscribe({
      next: (data) => {
        // extra safety filter on frontend
        this.letters = data.filter(l => !l.unlocked);
      },
      error: (err) => console.error(err)
    });
  }

  closeUnlockedLetters() {
    this.showUnlockedModal = false;
  }
  loadUnlockedLetters() {
    this.letterService.getLetters().subscribe({
      next: (data) => {
        this.letters = data;
      },
      error: (err) => console.error(err)
    });
  }
  showUnlockedLetters() {
    this.currentView = 'unlocked';
    this.loadUnlockedLetters();
  }

  showWriteView() {
    this.currentView = 'write';
  }

  openReflection(letter: Letter) {
    this.selectedLetterId = letter.id!;
    this.reflectionText = letter.reflection || '';
    this.selectedMood = letter.mood || '';
  }

  closeReflection() {
    this.selectedLetterId = null;
  }

  saveReflection(letter: Letter) {
    if (!letter.id) return;

    this.letterService.updateLetter(letter.id, {
      reflection: this.reflectionText,
      mood: this.selectedMood
    }).subscribe({
      next: (updated) => {
        letter.reflection = updated.reflection;
        letter.mood = updated.mood;
        this.closeReflection();
      },
      error: (err) => {
        console.error(err);
        alert('Failed to save reflection');
      }
    });
  }

  goToAnalytics() {
    this.router.navigate(['/analytics']);
  }
}
