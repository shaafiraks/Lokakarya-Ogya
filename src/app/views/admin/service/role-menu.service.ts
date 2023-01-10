import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleMenuService {
  baseUrl = environment.BASE_API_URL;
  
  constructor(private http: HttpClient) { }

  get():Observable<any>{
    return this.http.get(this.baseUrl + 'roleMenu/findAll',{
      responseType: "json",
    })
  }

  add(data:any): Observable<any>{
    var headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      Accept: 'application/json',
    });
    const urlPost = this.baseUrl + 'roleMenu/';
    return this.http.post<any>(urlPost,data, { headers});
  }

  edit(data:any): Observable<any>{
    var headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      Accept: 'application/json',
    });
    const urlPost = this.baseUrl + 'roleMenu/';
    return this.http.put<any>(urlPost,data, { headers});
  }

  delete(id:number): Observable<any>{
    var headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      Accept: 'application/json',
    });
    return this.http.delete(this.baseUrl + 'roleMenu/deleteById?id=' + id);
  }
}
