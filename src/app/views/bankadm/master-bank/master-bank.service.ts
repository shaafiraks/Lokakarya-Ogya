import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MasterBankService {

  baseUrl = environment.BASE_API_URL;

  //service find all data nasabah
  findAll(): Observable<any> {
    return this.http.get(this.baseUrl + 'masterbank/findAllPlan', {
      responseType: "json",
    })
  }

  //service add data nasabah baru
  addNasabah(data: any): Observable<any> {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    const urlPost = this.baseUrl + 'masterbank/';
    return this.http.post<any>(urlPost, data, { headers });
  }

  //service edit data nasabah tertentu
  editNasabah(data: any): Observable<any> {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    const urlPost = this.baseUrl + 'masterbank/';
    return this.http.put<any>(urlPost, data, { headers });
  }

  //service delete data nasabah tertentu
  deleteNasabah(id: number): Observable<any> {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    return this.http.delete(this.baseUrl + 'masterbank/deleteById?id=' + id);
  }

  //service get all data user
  findAllUser(): Observable<any> {
    return this.http.get(this.baseUrl + 'users/findAllPlan', {
      responseType: "json",
    })
  }

  findUserById(userId:number): Observable<any> {
    return this.http.get(this.baseUrl + `users/findById?id=${userId}`, {
      responseType: "json",
    })
  }

  constructor(private http: HttpClient) {}
}
