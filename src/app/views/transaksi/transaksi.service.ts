import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class TransaksiService {
  baseUrl = environment.BASE_API_URL;

  constructor(private http: HttpClient) {}

  //PANGGIL API SERVICE CEK SALDO
  getNasabah(param: number): Observable<any> {
    

    return this.http.get( this.baseUrl + `transaksiNasabah/cekSaldo?Nomor%20Rekening=${param}`,
      {
        responseType: 'json',
      }
    );
  }

  //PANGGIL API SERVICE SETOR TUNAI
  getSetorTunai(norek: number, nominal: number): Observable<any> {
    return this.http.post( this.baseUrl + `transaksiNasabah/setor?Nomor%20Rekening=${norek}&Nominal=${nominal}`,
      {
        responseType: 'json',
      }
    );
  }

  //PANGGIL API SERVICE TARIK TUNAI
  getTarikTunai(norek: number, nominal: number): Observable<any> {
    return this.http.post( this.baseUrl + `transaksiNasabah/tarik?Nomor%20Rekening=${norek}&Nominal=${nominal}`,
      {
        responseType: 'json',
      }
    );
  }

  // PANGGIL API SERVICE TRANSFER
  getTransfer(
    norekAsal: number,
    norekTujuan: number,
    nominal: number
  ): Observable<any> {
    return this.http.post(this.baseUrl +
      `transaksiNasabah/transfer?Nomor%20Rekening%20Asal=${norekAsal}&Nomor%20Rekening%20Tujuan=${norekTujuan}&Nominal=${nominal}`,
      {
        responseType: 'json',
      }
    );
  }

  getAllNasabah(): Observable<any> {
    return this.http.get(this.baseUrl + 'masterBank/findAll', {
      responseType: 'json',
    });
  }

  getBayartelepon(noRekening: number, noTelepon: number): Observable<any> {
    return this.http.post(this.baseUrl +
      `transaksiNasabah/bayarTelpon?Nomor%20Rekening=${noRekening}&No%20Telepon=${noTelepon}`,
      {
        responseType: 'json',
      }
    );
  }

  findBayarTelepon(noRekening: number, noTelepon: number): Observable<any> {
    return this.http.get(this.baseUrl + 
      `transaksiNasabah/findByNoRekAndNoTelp?Nomor%20Rekening=${noRekening}&No%20Telepon=${noTelepon}`,
      {
        responseType: 'json',
      }
    );
  }

  //PANGGIL API SERVICE BAYAR TELEPON PERBULAN
  postBayarteleponPerBulan(
    noRekening: number,
    noTelepon: number,
    bulanKe: number
  ): Observable<any> {
    return this.http.post(this.baseUrl +
      `transaksiNasabah/bayarTelponPerbulan?Nomor%20Rekening=${noRekening}&No%20Telepon=${noTelepon}&Bulan%20Tagihan=${bulanKe}`,
      {
        responseType: 'json',
      }
    );
  }

  getTotalTagihan(noRekening: number, noTelepon: number): Observable<any> {
    return this.http.get(this.baseUrl +
      `transaksiNasabah/findTotalTagihan?Nomor%20Rekening=${noRekening}&No%20Telepon=${noTelepon}`,
      {
        responseType: 'json',
      }
    );
  }

  //DOWNLOAD PDF SETOR TUNAI
  downloadSetorTunai(idHistory:number): Observable<any>{
    return this.http.get(this.baseUrl + `transaksiNasabah/exportToPdfSetorParam?ID%20History=${idHistory}`,
    {
       responseType: 'blob',
    }
    );
  }

    //DOWNLOAD PDF TARIK TUNAI
    downloadTarikTunai(idHistory:number): Observable<any>{
      return this.http.get(this.baseUrl + `transaksiNasabah/exportToPdfTarikParam?ID%20History=${idHistory}`,
      {
         responseType: 'blob',
      }
      );
    }

    //DOWNLOAD PDF TRANSFER
    downloadTransfer(idHistory:number): Observable<any>{
      return this.http.get(this.baseUrl + `transaksiNasabah/exportToPdfTransferParam?ID%20History=${idHistory}`,
      {
         responseType: 'blob',
      }
      );
    }

        //DOWNLOAD PDF BAYAR TELEPON
        downloadBayarTelepon(idHistoryBank:number, idHistoryTelepon:number): Observable<any>{
          return this.http.get(this.baseUrl + `transaksiNasabah/exportToPdfBayarTeleponParam?ID%20History%20Bank=${idHistoryBank}&ID%20History%20Telepon=${idHistoryTelepon}`,
          {
             responseType: 'blob',
          }
          );
        }

}
