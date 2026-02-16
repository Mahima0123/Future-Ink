import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css'] // added in case you have CSS
})
export class RegisterComponent {

  form = {
    username: '',
    password: ''
  };

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    this.auth.register(this.form).subscribe({
      next: () => {
        alert('Registration successful! Please login.');
        this.router.navigate(['/login']);
      },
      error: () => alert('Registration failed. Try a different username.')
    });
  }
}
