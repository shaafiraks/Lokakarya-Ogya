import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterBankService {

  findAll():Observable<any>{
    return this.http.get("http://localhost:8080/masterbank/findAllPlan",{
      responseType: "json",
    })
  }

  addNasabah(data:any): Observable<any>{
    var headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      Accept: 'application/json',
    });
    const urlPost = 'http://localhost:8080/masterbank/';
    return this.http.post<any>(urlPost,data, { headers});
  }

  editNasabah(data:any): Observable<any>{
    var headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      Accept: 'application/json',
    });
    const urlPost = 'http://localhost:8080/masterbank/';
    return this.http.put<any>(urlPost,data, { headers});
  }

  deleteNasabah(id:number): Observable<any>{
    var headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      Accept: 'application/json',
    });
    return this.http.delete('http://localhost:8080/masterbank/deleteById?id=' + id);
  }

  constructor(private http: HttpClient) { }
}
