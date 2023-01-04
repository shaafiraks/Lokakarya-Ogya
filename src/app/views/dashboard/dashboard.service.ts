import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  findAllMasterPelanggan():Observable<any>{
    return this.http.get("http://localhost:8080/masterpelanggan/findAllPlan",{
      responseType: "json",
    })
  }

  findAllMasterBank():Observable<any> {
    return this.http.get('http://localhost:8080/masterbank/findAllPlan', {
      responseType:'json',
    })
  }
  constructor(private http: HttpClient) { }
}
