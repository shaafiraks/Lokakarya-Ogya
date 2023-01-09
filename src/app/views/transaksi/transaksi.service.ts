import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransaksiService {

  constructor(
    private http: HttpClient,
  ) { }

  //PANGGIL API SERVICE CEK SALDO
  getNasabah(param: number): Observable<any> {
    // return this.http.get(`http://localhost:8080/transaksiNasabah/cekSaldo?Nomor%20Rekening=${param}`,
    return this.http.get(`http://localhost:8080/transaksiNasabah/cekSaldo?Nomor%20Rekening=${param}`,
      {
        responseType: "json",
      });
  }

  //PANGGIL API SERVICE SETOR TUNAI
  getSetorTunai(norek: number, nominal: number): Observable<any> {
    // return this.http.post(`http://localhost:8080/transaksiNasabah/setor?Nomor%20Rekening=${norek}&Nominal=${nominal}`,
    return this.http.post(`http://localhost:8080/transaksiNasabah/setor?Nomor%20Rekening=${norek}&Nominal=${nominal}`,
     {
      responseType: "json",
    });
  }

  //PANGGIL API SERVICE TARIK TUNAI
  getTarikTunai(norek: number, nominal: number): Observable<any> {
    // return this.http.post(`http://localhost:8080/transaksiNasabah/tarik?Nomor%20Rekening=${norek}&Nominal=${nominal}`, 
    return this.http.post(`http://localhost:8080/transaksiNasabah/tarik?Nomor%20Rekening=${norek}&Nominal=${nominal}`, 
    {
      responseType: "json",
    });
  }

  // PANGGIL API SERVICE TRANSFER
  getTransfer(norekAsal: number, norekTujuan: number, nominal: number): Observable<any> {
    // return this.http.post(`http://localhost:8080/transaksiNasabah/transfer?Nomor%20Rekening%20Asal=${norekAsal}&Nomor%20Rekening%20Tujuan=${norekTujuan}&Nominal=${nominal}`, 
    return this.http.post(`http://localhost:8080/transaksiNasabah/transfer?Nomor%20Rekening%20Asal=${norekAsal}&Nomor%20Rekening%20Tujuan=${norekTujuan}&Nominal=${nominal}`, 
    {
      responseType: "json",
    });
  }


  getAllNasabah(): Observable<any> {
    // return this.http.get("http://localhost:8080/masterBank/findAll", 
    return this.http.get("http://localhost:8080/masterBank/findAll", 
    {
      responseType: "json",
    });
  }

  getBayartelepon(noRekening: number, noTelepon: number): Observable<any> {
    // return this.http.post(`http://localhost:8080/transaksiNasabah/bayarTelpon?Nomor%20Rekening=${noRekening}&No%20Telepon=${noTelepon}`, 
    return this.http.post(`http://localhost:8080/transaksiNasabah/bayarTelpon?Nomor%20Rekening=${noRekening}&No%20Telepon=${noTelepon}`, 
    {
      responseType: "json",
    });
  }

  findBayarTelepon(noRekening: number, noTelepon: number): Observable<any> {
    // return this.http.get(`http://localhost:8080/transaksiNasabah/findByNoRekAndNoTelp?Nomor%20Rekening=${noRekening}&No%20Telepon=${noTelepon}`, 
    return this.http.get(`http://localhost:8080/transaksiNasabah/findByNoRekAndNoTelp?Nomor%20Rekening=${noRekening}&No%20Telepon=${noTelepon}`, 
    {
      responseType: "json",

    });
  }
}
