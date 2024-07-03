import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeManagementService } from '../../services/services';
import { User } from '../../services/models';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  token = localStorage.getItem('token') || '';
  base64Url = this.token.split('.')[1];
  base64 = this.base64Url.replace('-', '+').replace('_', '/');
  tokenPayload = JSON.parse(window.atob(this.base64));
  email = this.tokenPayload.sub;
  employee!: User;

  constructor(
    private router: Router,
    private employeeManagementService: EmployeeManagementService,
  ) {}

  ngOnInit() {
    this.getEmployee(this.email);
  }

  public getEmployee(email: string): void {
    this.employeeManagementService.getEmployeeByEmail({
      email
    }).subscribe({
      next: (res) => {
        if (res instanceof Blob) {
          this.parseBlobResponse(res);
        }
      },
      error: () => {
        console.error('Error fetching employee');
      }
    });
  }

  private parseBlobResponse(blob: Blob): void {
    const reader = new FileReader();
    reader.addEventListener('loadend', () => {
      const text = reader.result;
      if (text) {
        const data = JSON.parse(text.toString());
        this.employee = data;
      }
    });
    reader.readAsText(blob);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
