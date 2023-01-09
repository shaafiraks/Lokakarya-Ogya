import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  findAll(): Observable<any> {
    return this.http.get("http://localhost:8080/masterpelanggan/findAllPlan", {
      responseType: "json",
    })
  }

  findAllUserId(): Observable<any> {
    return this.http.get("http://localhost:8080/users/findAllPlan", {
      responseType: "json",
    })
  }

  findUsersByUserId(userId: number): Observable<any> {
    return this.http.get("http://localhost:8080/users/findById?id=" + userId, {
      responseType: "json",
    })
  }

  addMasterPelanggan(data: any): Observable<any> {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    const urlPost = 'http://localhost:8080/masterpelanggan/';
    return this.http.post<any>(urlPost, data, { headers });
  }

  editPelanggan(data: any): Observable<any> {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    const urlPost = 'http://localhost:8080/masterpelanggan/';
    return this.http.put<any>(urlPost, data, { headers });
  }

  deleteMasterPelanggan(id: number): Observable<any> {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    return this.http.delete('http://localhost:8080/masterpelanggan/deleteById?id=' + id);
  }

  findUserById(userId:number): Observable<any> {
    return this.http.get(`http://localhost:8080/users/findById?id=${userId}`, {
      responseType: "json",
    })
  }


  constructor(private http: HttpClient) { }
}