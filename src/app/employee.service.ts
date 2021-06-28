import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Employee} from './Employee';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  public findAllEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/employee/findAll`);
  }

  public findEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/employee/find/${id}`);
  }

  public saveEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiUrl}/employee/save`, employee);
  }

  public updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/employee/update`, employee);
  }

  public deleteEmployee(id?: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/employee/delete/${id}`);
  }
}
