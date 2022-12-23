import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  constructor(private http: HttpClient) { }

    getEmployees(): Observable<any> {
      return this.http.get("http://localhost:8080/employees/findAll", {
        responseType: "json",
      });
    }

    addEmployee(data: any): Observable<any> {
      var headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      })
      const urlPost = "http://localhost:8080/employees/";
      return this.http.post<any>(urlPost, data, {headers})
    }
}