import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Letter, LetterService } from '../../services/letter';
@Component({
  selector: 'app-letter-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './letter-form.html',
  styleUrl: './letter-form.css',
})
export class LetterForm {
  title = '';
  body = '';
  unlock_at = '';

  constructor(private letterService: LetterService) {}

  submitLetter() {
    if (!this.title || !this.body || !this.unlock_at) {
      alert('Please fill all fields!');
      return;
    }

    const newLetter: Letter = {
      title: this.title,
      body: this.body,
      unlock_at: this.unlock_at
    };

    this.letterService.addLetter(newLetter).subscribe({
      next: () => {
        alert('Letter added successfully!');
        this.title = '';
        this.body = '';
        this.unlock_at = '';
      },
      error: (err) => {
        console.error(err);
        alert('Error adding letter.');
      }
    });
  }
}
