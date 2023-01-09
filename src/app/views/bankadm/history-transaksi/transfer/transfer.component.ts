import { Component, OnInit } from '@angular/core';
import { HistoryTransaksiService } from '../history-transaksi.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {

  // varibael-variabel untuk menampung data
public transferHistory: any = [];
public transferHariIni: any = [];
searchQuery: string = '';

constructor(private transferService : HistoryTransaksiService,) { }

//get data dari service 
getData() {
  this.transferService.findAllTransfer().subscribe({
    next: (res: any) => {
      this.transferHistory = res.data;
      // console.log(res);
    },
    error: (error) => {
      console.error('ini error: ', error);
    }
  });

  this.transferService.jumlahTransferHariIni().subscribe({
    next: (res: any) => {
      this.transferHariIni = res;
      // console.log(res);
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
