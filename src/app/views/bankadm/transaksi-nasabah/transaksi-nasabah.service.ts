import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransaksiNasabahService {
  findAll(): Observable<any> {
    return this.http.get('http://localhost:8080/transfernasabah/findAllPlan', {
      responseType: 'json',
    });
  }

  addTransaksiNasabah(data: any): Observable<any> {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    const urlPost = 'http://localhost:8080/transfernasabah/';
    return this.http.post<any>(urlPost, data, { headers });
  }

  editTransaksiNasabah(data: any): Observable<any> {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    const urlPost = 'http://localhost:8080/transfernasabah/';
    return this.http.put<any>(urlPost, data, { headers });
  }

  deleteTransaksiNasabah(id: number): Observable<any> {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    return this.http.delete(
      'http://localhost:8080/transfernasabah/deleteById?id=' + id
    );
  }

  constructor(private http: HttpClient) {}
}
