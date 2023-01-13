import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HistoryTransaksiService {

  baseUrl = environment.BASE_API_URL;

  pagingAndFilter(search:any):Observable<any>{
    let bodyString = JSON.stringify(search);
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    return this.http.post(
      this.baseUrl + 'historybank/findAllWithPaginationAndFilter',
      bodyString,{headers}
    );
  }

//============================================== S E T O R =========================================================
   
  //service find all setor history
  findAllSetor(): Observable<any> {
    return this.http.get(this.baseUrl + 'historybank/getByStatusKet?statusKet=1', {
      responseType: "json",
    })
  }

  //service find setor hari ini
  jumlahSetorHariIni(): Observable<any> {
    return this.http.get(this.baseUrl + 'historybank/sumStatus1', {
      responseType: "json",
    })
  }

  //service find data Setor paging
  getSetorPaginations(
    page: number | undefined,
    size: number | undefined,
    search: any
  ): Observable<any>{
    let bodyString = JSON.stringify(search);
    console.log(bodyString);

    return this.http.get(
      this.baseUrl + `historybank/findByStatusKetPagination?statusKet=1&page=${page}&size=${size}`,
      {
        responseType: 'json'
      }
    );
  }

  //service download pdf
  downloadSetor(): Observable<any>{
    return this.http.get(this.baseUrl + 'historybank/exportToPdfALLSetor',{
      responseType: "blob",
    })
  }

  //============================================== T A R I K =========================================================
  
  //service find all tarik history
  findAllTarik(): Observable<any> {
    return this.http.get(this.baseUrl + 'historybank/getByStatusKet?statusKet=2', {
      responseType: "json",
    })
  }

  //service find tarik hari ini
  jumlahTarikHariIni(): Observable<any> {
    return this.http.get(this.baseUrl + 'historybank/sumStatus2', {
      responseType: "json",
    })
  }

  //service find data Tarik paging
  getTarikPaginations(
    page: number | undefined,
    size: number | undefined,
    search: any
  ): Observable<any>{
    let bodyString = JSON.stringify(search);
    console.log(bodyString);

    return this.http.get(
      this.baseUrl + `historybank/findByStatusKetPagination?statusKet=2&page=${page}&size=${size}`,
      {
        responseType: 'json'
      }
    );
  }

  //service download pdf
  downloadTarik(): Observable<any>{
    return this.http.get(this.baseUrl + 'historybank/exportToPdfALLTarik',{
      responseType: "blob",
    })
  }

  //============================================== T R A N S F E R =========================================================

  //seervice find all data transfer
  findAllTransfer(): Observable<any> {
    return this.http.get(this.baseUrl + 'historybank/getByStatusKet?statusKet=3', {
      responseType: "json",
    })
  }

  //service find transfer hari ini
  jumlahTransferHariIni(): Observable<any> {
    return this.http.get(this.baseUrl + 'historybank/sumStatus3', {
      responseType: "json",
    })
  }

  //service find data transfer paging
  getTransferPaginations(
    page: number | undefined,
    size: number | undefined,
    search: any
  ): Observable<any>{
    let bodyString = JSON.stringify(search);
    console.log(bodyString);

    return this.http.get(
      this.baseUrl + `historybank/findByStatusKetPagination?statusKet=3&page=${page}&size=${size}`,
      {
        responseType: 'json'
      }
    );
  }
  
  //service download pdf
  downloadTransfer(): Observable<any>{
    return this.http.get(this.baseUrl + 'historybank/exportToPdfALLTransfer',{
      responseType: "blob",
    })
  }

  //============================================== B A Y A R   T E L E P O N =========================================================

  //service find all bayar telepon history
  findAllBayarTelepon(): Observable<any> {
    return this.http.get(this.baseUrl + 'historybank/getByStatusKet?statusKet=4', {
      responseType: "json",
    })
  }

  //service find bayar telepon hari ini
  jumlahBayarTeleponHariIni(): Observable<any> {
    return this.http.get(this.baseUrl + 'historybank/sumStatus4', {
      responseType: "json",
    })
  }

  //service find data BayarTelepon paging
  getBayarTeleponPaginations(
    page: number | undefined,
    size: number | undefined,
    search: any
  ): Observable<any>{
    let bodyString = JSON.stringify(search);
    console.log(bodyString);

    return this.http.get(
      this.baseUrl + `historybank/findByStatusKetPagination?statusKet=4&page=${page}&size=${size}`,
      {
        responseType: 'json'
      }
    );
  }

  //service download pdf
  downloadBayarTelepon(): Observable<any>{
    return this.http.get(this.baseUrl + 'historybank/exportToPdfALLBayarTelepon',{
      responseType: "blob",
    })
  }

  //============================================== C R U D =========================================================

  findAll(): Observable<any> {
    return this.http.get(this.baseUrl + 'historybank/findAllPlan', {
      responseType: "json",
    })
  }

  addHistory(data: any): Observable<any> {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    const urlPost = this.baseUrl + 'historybank/';
    return this.http.post<any>(urlPost, data, { headers });
  }

  editHistory(data: any): Observable<any> {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    const urlPost = this.baseUrl + 'historybank/';
    return this.http.put<any>(urlPost, data, { headers });
  }

  deleteHistory(id: number): Observable<any> {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    return this.http.delete(this.baseUrl + 'historybank/deleteById?id=' + id);
  }

  constructor(private http: HttpClient) {}
}
