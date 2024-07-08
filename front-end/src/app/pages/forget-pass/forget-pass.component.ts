import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../services/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-pass',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './forget-pass.component.html',
  styleUrl: './forget-pass.component.scss'
})
export class ForgetPassComponent {
  email: string = '';
  errorMessage: Array<string> = [];
  submitted: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ){}

  resetPassword() {
    this.errorMessage = [];
    this.authService.resetPassword({
      email: this.email
    }).subscribe({
      next: () => {
        this.submitted = true;
      },
      error: (err) => {
        console.error('Reset password error:', err);  // Log the entire error object for debugging
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

  login() {
    this.router.navigate(['/login']);
  }
}
