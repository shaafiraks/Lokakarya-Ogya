import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubMenuService {
  constructor(private http: HttpClient) {}

  get(): Observable<any> {
    return this.http.get('http://192.168.182.102:8080/subMenu/findAll', {
      responseType: 'json',
    });
  }

  add(data: any): Observable<any> {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    const urlPost = 'http://192.168.182.102:8080/subMenu/';
    return this.http.post<any>(urlPost, data, { headers });
  }

  edit(data: any): Observable<any> {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    const urlPost = 'http://192.168.182.102:8080/subMenu/';
    return this.http.put<any>(urlPost, data, { headers });
  }

  delete(id: number): Observable<any> {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    return this.http.delete(
      'http://192.168.182.102:8080/subMenu/deleteById?id=' + id
    );
  }
}
