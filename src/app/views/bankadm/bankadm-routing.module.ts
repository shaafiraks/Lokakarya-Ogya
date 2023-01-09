import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BayarTeleponComponent } from './history-transaksi/bayar-telepon/bayar-telepon.component';
import { HistoryTransaksiComponent } from './history-transaksi/history-transaksi.component';
import { SetorComponent } from './history-transaksi/setor/setor.component';
import { TarikComponent } from './history-transaksi/tarik/tarik.component';
import { TransferComponent } from './history-transaksi/transfer/transfer.component';
import { MasterBankComponent } from './master-bank/master-bank.component';
import { TransaksiNasabahComponent } from './transaksi-nasabah/transaksi-nasabah.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: '',
    },
    children: [
      {
        path: 'history-transaksi',
        component: HistoryTransaksiComponent,
        data: {
          title: 'History Bank',
        },
      },
      {
        path: 'bayar-telepon',
        component: BayarTeleponComponent,
        data: {
          title: 'Bayar Telepon',
        },
      },
      {
        path: 'tarik',
        component: TarikComponent,
        data: {
          title: 'Tarik',
        },
      },
      {
        path: 'transfer',
        component: TransferComponent,
        data: {
          title: 'Transfer',
        },
      },
      {
        path: 'master-bank',
        component: MasterBankComponent,
        data: {
          title: 'Master Bank',
        },
      },
      {
        path: 'setor',
        component: SetorComponent,
        data: {
          title: 'Setor',
        },
      },
      {
        path: 'transaksi-nasabah',
        component: TransaksiNasabahComponent,
        data: {
          title: 'Transaksi Nasabah',
        },
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankadmRoutingModule { }
