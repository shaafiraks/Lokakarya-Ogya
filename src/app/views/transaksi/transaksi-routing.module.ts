import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BayarTeleponComponent } from './bayar-telepon/bayar-telepon.component';
import { CekSaldoComponent } from './cek-saldo/cek-saldo.component';
import { SetorTunaiComponent } from './setor-tunai/setor-tunai.component';
import { TarikTunaiComponent } from './tarik-tunai/tarik-tunai.component';
import { TransferComponent } from './transfer/transfer.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: '',
    },
    children: [
      {
        path: 'bayar-telepon',
        component: BayarTeleponComponent,
        data: {
          title: 'Bayar Telepon',
        },
      },
      {
        path: 'cek-saldo',
        component: CekSaldoComponent,
        data: {
          title: 'Cek Saldo',
        },
      },
      {
        path: 'setor-tunai',
        component: SetorTunaiComponent,
        data: {
          title: 'Setor Tunai',
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
        path: 'tarik-tunai',
        component: TarikTunaiComponent,
        data: {
          title: 'Tarik Tunai',
        },
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransaksiRoutingModule { }
