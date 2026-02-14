import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'] // added in case you have CSS
})
export class LoginComponent {

  form = {
    username: '',
    password: ''
  };

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.auth.login(this.form).subscribe({
      next: (res: any) => {
        this.auth.saveToken(res.access); // save JWT token
        this.router.navigate(['/dashboard']); // redirect after login
      },
      error: () => alert('Login failed. Please check your credentials.')
    });
  }
}
