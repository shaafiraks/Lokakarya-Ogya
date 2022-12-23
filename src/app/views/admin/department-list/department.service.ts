import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  findAll():Observable<any>{
    return this.http.get("http://localhost:8080/departments/findAllPlan",{
      responseType: "json",
    })
  }

  addDepartment(data:any): Observable<any>{
    var headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      Accept: 'application/json',
    });
    const urlPost = 'http://localhost:8080/departments/';
    return this.http.post<any>(urlPost,data, { headers});
  }

  constructor(private http: HttpClient) { }
}
