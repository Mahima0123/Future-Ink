import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetterService, Letter } from '../../services/letter';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analytics.html',
  styleUrls: ['./analytics.css']
})
export class Analytics implements OnInit {

  letters: Letter[] = [];
  totalUnlocked = 0;
  mostCommonMood = '';
  reflectionRate = 0;

  constructor(private letterService: LetterService) {}

  ngOnInit() {
    this.loadAnalytics();
  }

  loadAnalytics() {
    this.letterService.getUnlockedLetters().subscribe({
      next: (data) => {
        this.letters = data.filter(l => l.mood);
        this.buildMoodChart();
      }
    });
  }

  buildMoodChart() {

    const moodCount: any = {};

    this.letters.forEach(letter => {
      const mood = letter.mood!;
      moodCount[mood] = (moodCount[mood] || 0) + 1;
    });

    const labels = Object.keys(moodCount);
    const values = Object.values(moodCount);

    new Chart('moodChart', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Mood Distribution',
          data: values
        }]
      }
    });
  }

  calculateMetrics() {

    this.totalUnlocked = this.letters.length;

    const moodCounts: any = {};
    let reflections = 0;

    this.letters.forEach(l => {
      if (l.mood) {
        moodCounts[l.mood] = (moodCounts[l.mood] || 0) + 1;
      }
      if (l.reflection) reflections++;
    });

    this.mostCommonMood =
      Object.keys(moodCounts).reduce(
        (a, b) => moodCounts[a] > moodCounts[b] ? a : b,
        Object.keys(moodCounts)[0] || 'None'
      );

    this.reflectionRate =
      this.totalUnlocked === 0
        ? 0
        : Math.round((reflections / this.totalUnlocked) * 100);
  }
}