import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  //ambil data dari database
  login(username: String, password: String): Observable<any> {
    return this.http.get(
      'http://localhost:8080/users/login?identity=' +
        username +
        '&password=' +
        password,
      {
        responseType: 'json',
      }
    );
  }
}
