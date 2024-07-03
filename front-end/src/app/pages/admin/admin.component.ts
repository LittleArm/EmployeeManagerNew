import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../services/models/user';
import { EmployeeManagementService } from '../../services/services';
import { AuthenticationService } from '../../services/services';
import { RegistrationRequest } from '../../services/models';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  employees: User[] = [];
  editEmployee!: User;
  deleteEmployee!: User;
  registrationRequest: RegistrationRequest = { email: '', firstname: '', lastname: '', password: '' };
  errorMessage: Array<string> = [];
  currentPage = 1;
  itemsPerPage = 8;

  constructor(
    private router: Router,
    private employeeManagementService: EmployeeManagementService,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.getAllEmployees();
  }

  get paginatedEmployees() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.employees.slice(start, end);
  }

  totalPages() {
    return Math.ceil(this.employees.length / this.itemsPerPage);
  }

  changePage(page: number) {
    if (page > 0 && page <= this.totalPages()) {
      this.currentPage = page;
    }
  }

  public getAllEmployees(): void {
    this.employeeManagementService.getAllEmployees().subscribe({
      next: (res: User[]) => {
        if (res instanceof Blob) {
          this.parseBlobResponse(res);
        }
      },
      error: () => {
        console.error('Error getting employees:');
      }
    });
  }

  private parseBlobResponse(blob: Blob): void {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const res = JSON.parse(reader.result as string);
        this.employees = res;
      } catch (e) {
        console.error('Error parsing blob response:', e);
      }
    };
    reader.onerror = () => {
      console.error('Error reading blob response:', reader.error);
    };
    reader.readAsText(blob);
  }

  public onAddEmployee(addForm: NgForm): void {
    this.registrationRequest = addForm.value;
    this.authService.register({
      body: this.registrationRequest
    }).subscribe({
      next: () => {
        this.getAllEmployees();
        document.getElementById('add-employee-form')?.click();
        this.errorMessage = [];
      },
      error: (err) => {
        if (err.error instanceof Blob) {
          this.parseBlobError(err.error);
        } else {
          this.handleOtherErrors(err);
        }
      }
    });
  }

  public onUpdateEmployee(employee: User): void {
    this.employeeManagementService.updateEmployee({
      body: employee
    }).subscribe({
      next: () => {
        this.getAllEmployees();
      },
      error: (err) => {
        if (err.error instanceof Blob) {
          this.parseBlobError(err.error);
        } else {
          this.handleOtherErrors(err);
        }
      }
    });
  }

  public onDeleteEmployee(employeeId: number | undefined): void {
    if (employeeId) {
      this.employeeManagementService.deleteEmployee({
        id: employeeId
      }).subscribe({
        next: () => {
          this.getAllEmployees();
        },
        error: (err) => {
          if (err.error instanceof Blob) {
            this.parseBlobError(err.error);
          } else {
            this.handleOtherErrors(err);
          }
        }
      });
    }
  }

  public onOpenModal(employee: User, mode: string): void{
    const container = document.getElementById('admin-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    if (mode === 'edit') {
      this.editEmployee = employee;
      button.setAttribute('data-bs-target', '#updateEmployeeModal');
    }
    if (mode === 'delete') {
      this.deleteEmployee = employee;
      button.setAttribute('data-bs-target', '#deleteEmployeeModal');
    }
    container?.appendChild(button);
    button.click();
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

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
