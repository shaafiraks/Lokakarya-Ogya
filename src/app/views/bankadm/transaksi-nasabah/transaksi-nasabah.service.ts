import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TransaksiNasabahService {

  baseUrl = environment.BASE_API_URL;

  findAll(): Observable<any> {
    return this.http.get(this.baseUrl + 'transfernasabah/findAllPlan', {
      responseType: 'json',
    });
  }

  addTransaksiNasabah(data: any): Observable<any> {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    const urlPost = this.baseUrl + 'transfernasabah/';
    return this.http.post<any>(urlPost, data, { headers });
  }

  editTransaksiNasabah(data: any): Observable<any> {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    const urlPost = this.baseUrl + 'transfernasabah/';
    return this.http.put<any>(urlPost, data, { headers });
  }

  deleteTransaksiNasabah(id: number): Observable<any> {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    return this.http.delete(
      this.baseUrl + 'transfernasabah/deleteById?id=' + id
    );
  }

  constructor(private http: HttpClient) {}
}
