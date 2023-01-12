import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HakAksesService {
  baseUrl = environment.BASE_API_URL;

  constructor(private http: HttpClient) {}

  get(): Observable<any> {
    return this.http.get(this.baseUrl + 'hakAkses/findAll', {
      responseType: 'json',
    });
  }

  getPage(
    page: number | undefined,
    size: number | undefined,
    search: any
  ): Observable<any> {
    let bodyString = JSON.stringify(search); // Stringify payload
    console.log(bodyString);

    return this.http.get(
      this.baseUrl +
        'hakAkses/findAllWithPagination?page=' +
        page +
        '&size=' +
        size,
      {
        responseType: 'json',
      }
    );
  }

  add(data: any): Observable<any> {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    const urlPost = this.baseUrl + 'hakAkses/';
    return this.http.post<any>(urlPost, data, { headers });
  }

  edit(data: any): Observable<any> {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    const urlPost = this.baseUrl + 'hakAkses/';
    return this.http.put<any>(urlPost, data, { headers });
  }

  delete(id: number): Observable<any> {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    return this.http.delete(this.baseUrl + 'hakAkses/deleteById?id=' + id);
  }

  download(): Observable<any>{
    return this.http.get(
      this.baseUrl + 'hakAkses/exportToPdfALL',{
        responseType: 'blob',
      }
    );
  }
}
