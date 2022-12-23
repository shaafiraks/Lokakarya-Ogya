import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  findAll():Observable<any>{
    return this.http.get("http://localhost:8080/countries/findAllPlan",{
      responseType: "json",
    })
  }

  findAllMessage():Observable<any>{
    return this.http.get("http://localhost:8080/countries/findAll",{
      responseType: "json",
    })
  }

  addCountry(data:any): Observable<any>{
    var headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      Accept: 'application/json',
    });
    const urlPost = 'http://localhost:8080/countries/';
    return this.http.post<any>(urlPost,data, { headers});
  }

  editCountry(data:any): Observable<any>{
    var headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      Accept: 'application/json',
    });
    const urlPost = 'http://localhost:8080/countries/';
    return this.http.put<any>(urlPost,data, { headers});
  }

  deleteCountry(id:string): Observable<any>{
    var headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      Accept: 'application/json',
    });
    return this.http.delete('http://localhost:8080/countries/deleteById?id=' + id);
  }

  constructor(private http: HttpClient) { }
}
