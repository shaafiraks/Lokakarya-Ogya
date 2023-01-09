import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BankadmRoutingModule } from './bankadm-routing.module';
import { HistoryTransaksiComponent } from './history-transaksi/history-transaksi.component';
import { MasterBankComponent } from './master-bank/master-bank.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmPopupModule} from 'primeng/confirmpopup';
import { ConfirmDialogModule } from 'primeng/confirmdialog';



import {
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FormModule,
  GridModule,
  ListGroupModule,
  SharedModule
} from '@coreui/angular';

import { DocsComponentsModule } from '@docs-components/docs-components.module';
import { TableModule } from 'primeng/table'
import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import {MenuItem} from 'primeng/api';  
import {DialogModule} from 'primeng/dialog';
import {CalendarModule} from 'primeng/calendar';
import {InputTextModule} from 'primeng/inputtext';
import { TransaksiNasabahComponent } from './transaksi-nasabah/transaksi-nasabah.component';
import { SetorComponent } from './history-transaksi/setor/setor.component';
import { TarikComponent } from './history-transaksi/tarik/tarik.component';
import { TransferComponent } from './history-transaksi/transfer/transfer.component';
import { BayarTeleponComponent } from './history-transaksi/bayar-telepon/bayar-telepon.component';


@NgModule({
  declarations: [
    HistoryTransaksiComponent,
    MasterBankComponent,
    TransaksiNasabahComponent,
    SetorComponent,
    TarikComponent,
    TransferComponent,
    BayarTeleponComponent,
  ],
  imports: [
    CommonModule,
    BankadmRoutingModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    DialogModule,
    TableModule,
    AccordionModule,
    DocsComponentsModule,
    CardModule,
    FormModule,
    GridModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    FormModule,
    ButtonModule,
    ButtonGroupModule,
    DropdownModule,
    SharedModule,
    ListGroupModule,
    CalendarModule,
    InputTextModule,
  ]
})
export class BankadmModule { }
