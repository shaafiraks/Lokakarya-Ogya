import { Component, OnInit } from '@angular/core';
import { HistoryTransaksiService } from '../history-transaksi.service';

@Component({
  selector: 'app-tarik',
  templateUrl: './tarik.component.html',
  styleUrls: ['./tarik.component.scss']
})
export class TarikComponent implements OnInit {

  // varibael-variabel untuk menampung data
  public tarikHistory: any = [];
  public tarikHariIni: any = [];
  searchQuery: string = '';

  constructor(private tarikService : HistoryTransaksiService) { }

  //get data dari service 
  getData() {
    this.tarikService.findAllTarik().subscribe({
      next: (res: any) => {
        this.tarikHistory = res.data;
        console.log(res);
      },
      error: (error) => {
        console.error('ini error: ', error);
      }
    });

    this.tarikService.jumlahTarikHariIni().subscribe({
      next: (res: any) => {
        this.tarikHariIni = res;
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
