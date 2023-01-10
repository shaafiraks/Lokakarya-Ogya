import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TelpHistoryService {
  baseUrl = environment.BASE_API_URL;

  findAll(): Observable<any> {
    return this.http.get(this.baseUrl + 'historytelkom/findAllPlan', {
      responseType: 'json',
    });
  }

  addTelpHistory(data: any): Observable<any> {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    const urlPost = this.baseUrl + 'historytelkom/';
    return this.http.post<any>(urlPost, data, { headers });
  }

  editTelpHistory(data: any): Observable<any> {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    const urlPost = this.baseUrl + 'historytelkom/';
    return this.http.put<any>(urlPost, data, { headers });
  }

  deleteTelpHistory(id: number): Observable<any> {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    return this.http.delete(this.baseUrl + 'historytelkom/deleteById?id=' + id);
  }

  getNominal(): Observable<any> {
    return this.http.get(this.baseUrl + 'historytelkom/sumAll', {
      responseType: 'json',
    });
  }

  constructor(private http: HttpClient) {}
}
