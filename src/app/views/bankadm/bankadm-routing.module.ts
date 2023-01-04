import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MasterBankComponent} from './master-bank/master-bank.component';
import { HistoryTransaksiComponent} from './history-transaksi/history-transaksi.component';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Bank Admin',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'Bankadm',
      },
      {
        path: 'master-bank',
        component: MasterBankComponent,
        data: {
          title: 'Master Bank',
        },
      },
      {
        path: 'history-transaksi',
        component: HistoryTransaksiComponent,
        data: {
          title: 'History Transaksi',
        },
      },
      {
        path: 'master-bank',
        component: MasterBankComponent,
        data: {
          title: 'Master Bank',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class BankadmRoutingModule {}
