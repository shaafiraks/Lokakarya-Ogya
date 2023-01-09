import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterPelangganComponent } from './master-pelanggan/master-pelanggan.component';
import { TelpHistoryComponent } from './telp-history/telp-history.component';
import { TransaksiTelkomComponent } from './transaksi-telkom/transaksi-telkom.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: '',
    },
    children: [
      {
        path: 'master-pelanggan',
        component: MasterPelangganComponent,
        data: {
          title: 'Master Pelanggan',
        },
      },
      {
        path: 'transaksi-telkom',
        component: TransaksiTelkomComponent,
        data: {
          title: 'Laporan Penunggakan',
        },
      },
      {
        path: 'telp-history',
        component: TelpHistoryComponent,
        data: {
          title: 'Laporan Pelunasan',
        },
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TlpadminRoutingModule { }
