import { Component, OnInit } from '@angular/core';
import { HistoryTransaksiService } from '../history-transaksi.service';

@Component({
  selector: 'app-setor',
  templateUrl: './setor.component.html',
  styleUrls: ['./setor.component.scss']
})
export class SetorComponent implements OnInit {

  // varibael-variabel untuk menampung data
  public setorHistory: any = [];
  public setorHariIni: any = [];
  searchQuery: string = '';

  constructor(private setorService: HistoryTransaksiService) { }

  //get data dari service 
  getData() {
    this.setorService.findAllSetor().subscribe({
      next: (res: any) => {
        this.setorHistory = res.data;
        console.log(res);
      },
      error: (error) => {
        console.error('ini error: ', error);
      }
    });

    this.setorService.jumlahSetorHariIni().subscribe({
      next: (res: any) => {
        this.setorHariIni = res;
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
