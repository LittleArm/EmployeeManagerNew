import { Component } from '@angular/core';
import { RegistrationRequest } from '../../services/models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/services';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  registrationRequest: RegistrationRequest = { email: '', firstname: '', lastname: '', password: '' };
  errorMessage: Array<string> = [];

  constructor(
    private router: Router,
    private authService: AuthenticationService,
  ) {}

  login() {
    this.router.navigate(['/login']);
  }

  register() {
    this.errorMessage = [];
    this.authService.register({
      body: this.registrationRequest
    }).subscribe({
      next: () => {
        this.router.navigate(['/activate-account']);
      },
      error: (err) => {
        console.error('Registration error:', err);  // Log the entire error object for debugging
        if (err.error instanceof Blob) {
          this.parseBlobError(err.error);
        } else {
          this.handleOtherErrors(err);
        }
      }
    });
  }

  private parseBlobError(blob: Blob): void {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const errorObj = JSON.parse(reader.result as string);
        if (errorObj && errorObj.validationErrors) {
          this.errorMessage = errorObj.validationErrors;
        } else if (errorObj && errorObj.errorDescription) {
          this.errorMessage.push(errorObj.errorDescription);
        } else {
          this.errorMessage.push('An unknown server error occurred.');
        }
      } catch (e) {
        console.error('Error parsing blob:', e);
        this.errorMessage.push('An error occurred while processing the error response.');
      }
    };
    reader.onerror = () => {
      console.error('Error reading blob:', reader.error);
      this.errorMessage.push('An error occurred while reading the error response.');
    };
    reader.readAsText(blob);
  }

  private handleOtherErrors(err: any): void {
    if (err.error && err.error.validationErrors) {
      this.errorMessage = err.error.validationErrors;
    } else if (err.error && err.error.errorMessage) {
      this.errorMessage.push(err.error.errorMessage);
    } else {
      this.errorMessage.push('An unknown error occurred.');
    }
  }
}
