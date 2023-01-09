import { Component, OnInit } from '@angular/core';
import { HistoryTransaksiService } from '../history-transaksi.service';

@Component({
  selector: 'app-bayar-telepon',
  templateUrl: './bayar-telepon.component.html',
  styleUrls: ['./bayar-telepon.component.scss']
})
export class BayarTeleponComponent implements OnInit {

  // varibael-variabel untuk menampung data
  public bayarTeleponHistory: any = [];
  public bayarTeleponHariIni: any = [];
  searchQuery: string = '';

  constructor(private bayarTeleponService: HistoryTransaksiService) { }

  //get data dari service 
  getData() {
    this.bayarTeleponService.findAllBayarTelepon().subscribe({
      next: (res: any) => {
        this.bayarTeleponHistory = res.data;
        console.log(res);
      },
      error: (error) => {
        console.error('ini error: ', error);
      }
    });

    this.bayarTeleponService.jumlahBayarTeleponHariIni().subscribe({
      next: (res: any) => {
        this.bayarTeleponHariIni = res;
        console.log(res);
      },
      error: (error) => {
        console.error('ini error: ', error);
      }
    });
  }

  ngOnInit(): void {
    this.getData();

  }

}
