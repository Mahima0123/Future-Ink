import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Letter, LetterService } from '../../services/letter';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  letters: Letter[] = [];

  constructor(private letterService: LetterService) {}

  ngOnInit(): void {
    this.loadLetters();
  }

  loadLetters() {
    this.letterService.getLetters().subscribe({
      next: (data) => this.letters = data,
      error: (err) => console.error(err)
    });
  }
}
