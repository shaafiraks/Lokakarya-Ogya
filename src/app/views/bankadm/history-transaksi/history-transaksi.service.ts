import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoryTransaksiService {

  findAll():Observable<any>{
    return this.http.get("http://localhost:8080/historybank/findAllPlan",{
      responseType: "json",
    })
  }

  addHistory(data:any): Observable<any>{
    var headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      Accept: 'application/json',
    });
    const urlPost = 'http://localhost:8080/historybank/';
    return this.http.post<any>(urlPost,data, { headers});
  }

  editHistory(data:any): Observable<any>{
    var headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      Accept: 'application/json',
    });
    const urlPost = 'http://localhost:8080/historybank/';
    return this.http.put<any>(urlPost,data, { headers});
  }

  deleteHistory(id:number): Observable<any>{
    var headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      Accept: 'application/json',
    });
    return this.http.delete('http://localhost:8080/historybank/deleteById?id=' + id);
  }

  constructor(private http: HttpClient) { }
}
