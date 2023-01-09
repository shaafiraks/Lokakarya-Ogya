import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterBankService {

  //service find all data nasabah
  findAll(): Observable<any> {
    return this.http.get("http://localhost:8080/masterbank/findAllPlan", {
      responseType: "json",
    })
  }

  //service add data nasabah baru
  addNasabah(data: any): Observable<any> {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    const urlPost = 'http://localhost:8080/masterbank/';
    return this.http.post<any>(urlPost, data, { headers });
  }

  //service edit data nasabah tertentu
  editNasabah(data: any): Observable<any> {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    const urlPost = 'http://localhost:8080/masterbank/';
    return this.http.put<any>(urlPost, data, { headers });
  }

  //service delete data nasabah tertentu
  deleteNasabah(id: number): Observable<any> {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    return this.http.delete('http://localhost:8080/masterbank/deleteById?id=' + id);
  }

  //service get all data user 
  findAllUser(): Observable<any> {
    return this.http.get("http://localhost:8080/users/findAllPlan", {
      responseType: "json",
    })
  }

  findUserById(userId:number): Observable<any> {
    return this.http.get(`http://localhost:8080/users/findById?id=${userId}`, {
      responseType: "json",
    })
  }

  constructor(private http: HttpClient) { }
}