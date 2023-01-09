import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoryTransaksiService {

  findAll(): Observable<any> {
    return this.http.get("http://localhost:8080/historybank/findAllPlan", {
      responseType: "json",
    })
  }

  addHistory(data: any): Observable<any> {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    const urlPost = 'http://localhost:8080/historybank/';
    return this.http.post<any>(urlPost, data, { headers });
  }

  editHistory(data: any): Observable<any> {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    const urlPost = 'http://localhost:8080/historybank/';
    return this.http.put<any>(urlPost, data, { headers });
  }

  deleteHistory(id: number): Observable<any> {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    return this.http.delete('http://localhost:8080/historybank/deleteById?id=' + id);
  }


  findAllTransfer(): Observable<any> {
    return this.http.get("http://localhost:8080/historybank/getByStatusKet?statusKet=3", {
      responseType: "json",
    })
  }

  //aervice find transfer hari ini
  jumlahTransferHariIni(): Observable<any> {
    return this.http.get("http://localhost:8080/historybank/sumStatus3", {
      responseType: "json",
    })
  }

  //service find all tarik history
  findAllTarik(): Observable<any> {
    return this.http.get("http://localhost:8080/historybank/getByStatusKet?statusKet=2", {
      responseType: "json",
    })
  }

  //service find tarik hari ini
  jumlahTarikHariIni(): Observable<any> {
    return this.http.get("http://localhost:8080/historybank/sumStatus2", {
      responseType: "json",
    })
  }

  //service find all setor history
  findAllSetor(): Observable<any> {
    return this.http.get("http://localhost:8080/historybank/getByStatusKet?statusKet=1", {
      responseType: "json",
    })
  }

  //service find setor hari ini
  jumlahSetorHariIni(): Observable<any> {
    return this.http.get("http://localhost:8080/historybank/sumStatus1", {
      responseType: "json",
    })
  }

  //service find all bayar telepon history
  findAllBayarTelepon(): Observable<any> {
    return this.http.get("http://localhost:8080/historybank/getByStatusKet?statusKet=4", {
      responseType: "json",
    })
  }

  //service find bayar telepon hari ini
  jumlahBayarTeleponHariIni(): Observable<any> {
    return this.http.get("http://localhost:8080/historybank/sumStatus4", {
      responseType: "json",
    })
  }

  constructor(private http: HttpClient) { }
}
