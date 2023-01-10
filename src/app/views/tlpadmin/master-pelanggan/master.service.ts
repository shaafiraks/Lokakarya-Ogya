import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  baseUrl = environment.BASE_API_URL;

  findAll(): Observable<any> {
    return this.http.get(this.baseUrl + 'masterpelanggan/findAllPlan', {
      responseType: 'json',
    });
  }

  findAllUserId(): Observable<any> {
    return this.http.get(this.baseUrl + 'users/findAllPlan', {
      responseType: 'json',
    });
  }

  findUsersByUserId(userId: number): Observable<any> {
    return this.http.get(this.baseUrl + 'users/findById?id=' + userId, {
      responseType: 'json',
    });
  }

  addMasterPelanggan(data: any): Observable<any> {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    const urlPost = this.baseUrl + 'masterpelanggan/';
    return this.http.post<any>(urlPost, data, { headers });
  }

  editPelanggan(data: any): Observable<any> {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    const urlPost = this.baseUrl + 'masterpelanggan/';
    return this.http.put<any>(urlPost, data, { headers });
  }

  deleteMasterPelanggan(id: number): Observable<any> {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    return this.http.delete(
      this.baseUrl + 'masterpelanggan/deleteById?id=' + id
    );
  }

  findUserById(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}users/findById?id=${userId}`, {
      responseType: 'json',
    });
  }

  constructor(private http: HttpClient) {}
}
