import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {
  constructor(private http: HttpClient) { }

    getDepartments(): Observable<any> {
      return this.http.get("http://localhost:8080/departments/findAll", {
        responseType: "json",
      });
    }

    editDepartment(data: any): Observable<any>{
      var headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      })
      const url = "http://localhost:8080/departments/";
      return this.http.put<any>(url, data, {headers})
    }


    addDepartment(data: any): Observable<any> {
      var headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      })
      const urlPost = "http://localhost:8080/departments/";
      return this.http.post<any>(urlPost, data, {headers})
    }

    deleteDepartment(id: number): Observable<any> {
      return this.http.delete('http://localhost:8080/departments/deleteById?id='+ id)
    }
}