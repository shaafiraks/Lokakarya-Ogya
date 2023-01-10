import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
<<<<<<< HEAD
  baseUrl = environment.BASE_API_URL;

  constructor(private http: HttpClient) { }

  get():Observable<any>{
    return this.http.get(this.baseUrl + 'menu/findAll',{
      responseType: "json",
    })
=======
  constructor(private http: HttpClient) {}

  get(): Observable<any> {
    return this.http.get('http://localhost:8080/menu/findAll', {
      responseType: 'json',
    });
>>>>>>> d41ce87ae26e124241e4c285f5ac183b27dbb94c
  }

  add(data: any): Observable<any> {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
<<<<<<< HEAD
    const urlPost = this.baseUrl + 'menu/';
    return this.http.post<any>(urlPost,data, { headers});
=======
    const urlPost = 'http://localhost:8080/menu/';
    return this.http.post<any>(urlPost, data, { headers });
>>>>>>> d41ce87ae26e124241e4c285f5ac183b27dbb94c
  }

  edit(data: any): Observable<any> {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
<<<<<<< HEAD
    const urlPost = this.baseUrl + 'menu/';
    return this.http.put<any>(urlPost,data, { headers});
=======
    const urlPost = 'http://localhost:8080/menu/';
    return this.http.put<any>(urlPost, data, { headers });
>>>>>>> d41ce87ae26e124241e4c285f5ac183b27dbb94c
  }

  delete(id: number): Observable<any> {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    return this.http.delete(this.baseUrl + 'menu/deleteById?id=' + id);
  }
}
