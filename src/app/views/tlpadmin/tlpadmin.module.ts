import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TlpadminRoutingModule } from './tlpadmin-routing.module';
import { MasterPelangganComponent } from './master-pelanggan/master-pelanggan.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';

import {
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  // DropdownModule,
  FormModule,
  GridModule,
  ListGroupModule,
  SharedModule,
} from '@coreui/angular';

import { DocsComponentsModule } from '@docs-components/docs-components.module';
import { TableModule } from 'primeng/table';
import { AccordionModule } from 'primeng/accordion'; //accordion and accordion tab
import { MenuItem } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { TelpHistoryComponent } from './telp-history/telp-history.component';
import { TransaksiTelkomComponent } from './transaksi-telkom/transaksi-telkom.component';

@NgModule({
  declarations: [
    MasterPelangganComponent,
    TelpHistoryComponent,
    TransaksiTelkomComponent,
  ],
  imports: [
    CommonModule,
    TlpadminRoutingModule,
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
    ToastModule,
    InputMaskModule,
    DropdownModule,
  ],
})
export class TlpadminModule {}
