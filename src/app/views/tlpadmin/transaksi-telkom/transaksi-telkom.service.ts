import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransaksiTelkomService {

  findAll(): Observable<any> {
    return this.http.get('http://localhost:8080/transaksitelkom/findStatus1', {
      responseType: 'json',
    });
  }
  getTotal(): Observable<any> {
    return this.http.get('http://localhost:8080/transaksitelkom/sumAll', {
      responseType: 'json',
    });
  }

  addTransaksi(data: any): Observable<any> {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    const urlPost = 'http://localhost:8080/transaksitelkom/';
    return this.http.post<any>(urlPost, data, { headers });
  }

  editTransaksi(data: any): Observable<any> {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    const urlPost = 'http://localhost:8080/transaksitelkom/';
    return this.http.put<any>(urlPost, data, { headers });
  }

  deleteTransaksi(id: number): Observable<any> {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    return this.http.delete('http://localhost:8080/transaksitelkom/deleteById?id=' + id);
  }

  constructor(private http: HttpClient) { }
}
