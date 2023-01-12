import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TelpHistoryService {
  baseUrl = environment.BASE_API_URL;

  getPage(
    page: number | undefined,
    size: number | undefined,
    search: any
  ): Observable<any> {
    let bodyString = JSON.stringify(search); // Stringify payload
    console.log(bodyString);

    return this.http.get(
      this.baseUrl +
        'historytelkom/findAllWithPagination?page=' +
        page +
        '&size=' +
        size,
      {
        responseType: 'json',
      }
    );
  }

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

  download(): Observable<any> {
    return this.http.get(this.baseUrl + 'historytelkom/exportToPdfALL', {
      responseType: 'blob',
    });
  }

  constructor(private http: HttpClient) {}
}
