import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  baseUrl = environment.BASE_API_URL;

  constructor(private http: HttpClient) { }

  get():Observable<any>{
    return this.http.get(this.baseUrl + 'menu/findAll',{
      responseType: "json",
    })
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
        'menu/findAllWithPagination?page=' +
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
    const urlPost = this.baseUrl + 'menu/';
    return this.http.post<any>(urlPost,data, { headers});
  }

  edit(data: any): Observable<any> {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    const urlPost = this.baseUrl + 'menu/';
    return this.http.put<any>(urlPost,data, { headers});
  }

  delete(id: number): Observable<any> {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    return this.http.delete(this.baseUrl + 'menu/deleteById?id=' + id);
  }

  download(): Observable<any>{
    return this.http.get(
      this.baseUrl + 'menu/exportToPdfALL',{
        responseType: 'blob',
      }
    );
  }
}
