import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  constructor(private http: HttpClient) { }

    getLocations(): Observable<any> {
      return this.http.get("http://localhost:8080/locations/findAll", {
        responseType: "json",
      });
    }

    addLocation(data: any): Observable<any> {
      var headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      })
      const urlPost = "http://localhost:8080/locations/";
      return this.http.post<any>(urlPost, data, {headers})
    }
}