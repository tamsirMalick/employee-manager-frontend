import {Component, OnInit} from '@angular/core';
import {EmployeeService} from './employee.service';
import {Employee} from './Employee';
import {HttpErrorResponse} from '@angular/common/http';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'employee-manager';

  employees: Employee[] = [];
  editedEmployee?: Employee | null;
  deletedEmployee?: Employee | null;

  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit(): void {
    this.getAllEmployee();
  }

  private getAllEmployee(): void {
    this.employeeService.findAllEmployee().subscribe(
      (response) => {
        this.employees = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(employee: Employee | null, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    switch (mode) {
      case 'add': {
        button.setAttribute('data-target', '#addEmployeeModal');
        break;
      }
      case 'edit': {
        button.setAttribute('data-target', '#updateEmployeeModal');
        this.editedEmployee = employee;
        break;
      }
      case 'delete': {
        button.setAttribute('data-target', '#deleteEmployeeModal');
        this.deletedEmployee = employee;
        break;
      }
    }
    container?.appendChild(button);
    button.click();
  }

  addEmployee(employee: NgForm): void {
    document.getElementById('add-employee-form')?.click();
    this.employeeService.saveEmployee(employee.value).subscribe(
      (response) => {
        this.getAllEmployee();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  updateEmployee(employee: Employee): void {
    console.log(employee);
    this.employeeService.updateEmployee(employee).subscribe(
      (response) => {
        this.getAllEmployee();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  deleteEmployee(id?: number): void {
    console.log(id);
    this.employeeService.deleteEmployee(id).subscribe(
      () => {
        this.getAllEmployee();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  searchEmployee(key: string): void {
    const results: Employee[] = [];
    for (const employee of this.employees) {
      if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
      }
    }
    this.employees = results;
    if (results.length === 0 || !key) {
      this.getAllEmployee();
    }
  }
}
