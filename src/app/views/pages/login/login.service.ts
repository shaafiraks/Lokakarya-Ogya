import { environment } from './../../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  baseUrl = environment.BASE_API_URL;
  constructor(private http: HttpClient) {}

  //ambil data dari database
  login(username: String, password: String): Observable<any> {
    return this.http.post(
      this.baseUrl +
        'users/login?identity=' +
        username +
        '&password=' +
        password,
      {
        responseType: 'json',
      }
    );
  }
}
