import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/services';
import { AuthenticationRequest } from '../../services/models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {

    authRequest: AuthenticationRequest = { email: '', password: '' };
    errorMessage: Array<string> = [];

    constructor(
      private router: Router,
      private authService: AuthenticationService
    ) {}

    login() {
      this.errorMessage = [];
      this.authService.authenticate({
        body: this.authRequest
      }).subscribe({
        next: (res) => {
          this.router.navigate(['home']);
        },
        error: (err) => {
          console.error('Login error:', err);  // Log the entire error object for debugging

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

    register() {
      this.router.navigate(['/register']);
    }
}
