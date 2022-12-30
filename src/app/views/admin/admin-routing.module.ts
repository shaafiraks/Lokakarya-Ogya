import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MasterPelangganComponent } from './master-pelanggan/master-pelanggan.component';
import { TransaksiTelkomComponent } from './transaksi-telkom/transaksi-telkom.component';
import { TelpHistoryComponent } from './telp-history/telp-history.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Admin',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'Admin',
      },
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
          title: 'Transaksi Telkom',
        },
      },
      {
        path: 'telp-history',
        component: TelpHistoryComponent,
        data: {
          title: 'Telp History',
        },
      }

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
