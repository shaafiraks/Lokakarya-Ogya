import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  findAll():Observable<any>{
    return this.http.get("http://localhost:8080/employees/findAllPlan",{
      responseType: "json",
    })
  }

  addEmployee(data:any): Observable<any>{
    var headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      Accept: 'application/json',
    });
    const urlPost = 'http://localhost:8080/employees/';
    return this.http.post<any>(urlPost,data, { headers});
  }

  editEmployee(data:any): Observable<any>{
    var headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      Accept: 'application/json',
    });
    const urlPost = 'http://localhost:8080/employees/';
    return this.http.put<any>(urlPost,data, { headers});
  }

  deleteEmployee(id:number): Observable<any>{
    var headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      Accept: 'application/json',
    });
    return this.http.delete('http://localhost:8080/employees/deleteById?id=' + id);
  }

  constructor(private http: HttpClient) { }
}
