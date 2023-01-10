import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TransaksiTelkomService {
  baseUrl = environment.BASE_API_URL;

  findAll(): Observable<any> {
    return this.http.get(this.baseUrl + 'transaksitelkom/findStatus1', {
      responseType: 'json',
    });
  }
  getTotal(): Observable<any> {
    return this.http.get(this.baseUrl + 'transaksitelkom/sumAll', {
      responseType: 'json',
    });
  }

  addTransaksi(data: any): Observable<any> {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    const urlPost = this.baseUrl + 'transaksitelkom/';
    return this.http.post<any>(urlPost, data, { headers });
  }

  editTransaksi(data: any): Observable<any> {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    const urlPost = this.baseUrl + 'transaksitelkom/';
    return this.http.put<any>(urlPost, data, { headers });
  }

  deleteTransaksi(id: number): Observable<any> {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    return this.http.delete(
      this.baseUrl + 'transaksitelkom/deleteById?id=' + id
    );
  }

  constructor(private http: HttpClient) {}
}
