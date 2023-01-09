import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TelpHistoryService {

  findAll(): Observable<any> {
    return this.http.get('http://localhost:8080/historytelkom/findAllPlan', {
      responseType: 'json',
    });
  }

  addTelpHistory(data: any): Observable<any> {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    const urlPost = 'http://localhost:8080/historytelkom/';
    return this.http.post<any>(urlPost, data, { headers });
  }

  editTelpHistory(data: any): Observable<any> {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    const urlPost = 'http://localhost:8080/historytelkom/';
    return this.http.put<any>(urlPost, data, { headers });
  }

  deleteTelpHistory(id: number): Observable<any> {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    return this.http.delete('http://localhost:8080/historytelkom/deleteById?id=' + id);
  }

  getNominal(): Observable<any> {
    return this.http.get('http://localhost:8080/historytelkom/sumAll', {
      responseType: 'json',
    });
  }

  constructor(private http: HttpClient) { }
}
