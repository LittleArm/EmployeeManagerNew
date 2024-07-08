import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ResetPasswordRequest } from '../../services/models';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/services';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  resetRequest: ResetPasswordRequest = { newPassword: '', confirmPassword: '' };
  errorMessage: Array<string> = [];
  token = new URLSearchParams(window.location.search).get('token');

  constructor(
    private router: Router,
    private authService: AuthenticationService,
  ) {}

  public resetPassword() {
    console.log(this.token);
    this.authService.savePassword({
      token: this.token as string,
      body: this.resetRequest
    }).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log(err.error);
        this.errorMessage = err.error.validationErrors;
      }
    });
  }

  login() {
    this.router.navigate(['/login']);
  }
}
