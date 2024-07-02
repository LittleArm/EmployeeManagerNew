import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/services';
import { CodeInputModule } from 'angular-code-input';

@Component({
  selector: 'app-activate-account',
  standalone: true,
  imports: [CommonModule, FormsModule, CodeInputModule],
  templateUrl: './activate-account.component.html',
  styleUrl: './activate-account.component.scss'
})
export class ActivateAccountComponent {
  message: string = '';
  isActivated: boolean = true;
  submitted: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
  ) {}

  private confirmAccount(token: string) {
    this.authService.confirm({
      token
    }).subscribe({
      next: () => {
        this.message = 'Your account has been activated successfully! You can now login to your account.';
        this.submitted = true;
        this.isActivated = true;
      },
      error: () => {
        this.message = 'The token is invalid or expired. Please try again.';
        this.submitted = true;
        this.isActivated = false;
      }
    });
  }


  onCodeCompleted(token: any) {
    console.log('Token:', token);
    this.confirmAccount(token);
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }

}
