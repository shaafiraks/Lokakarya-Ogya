import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransaksiRoutingModule } from './transaksi-routing.module';
import { CekSaldoComponent } from './cek-saldo/cek-saldo.component';
import { SetorTunaiComponent } from './setor-tunai/setor-tunai.component';
import { TarikTunaiComponent } from './tarik-tunai/tarik-tunai.component';
import { TransferComponent } from './transfer/transfer.component';
import { BayarTeleponComponent } from './bayar-telepon/bayar-telepon.component';

import {
  ButtonGroupModule,
  // ButtonModule,
  CardModule,
  DropdownModule,
  FormModule,
  GridModule,
  ListGroupModule,
  SharedModule
} from '@coreui/angular';

import { DocsComponentsModule } from '@docs-components/docs-components.module';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {InputMaskModule} from 'primeng/inputmask';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ToastModule} from 'primeng/toast';
import {InputNumberModule} from 'primeng/inputnumber';
import {SelectButtonModule} from 'primeng/selectbutton';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ngxLoadingAnimationTypes, NgxLoadingModule } from 'ngx-loading';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [
    CekSaldoComponent,
    SetorTunaiComponent,
    TarikTunaiComponent,
    TransferComponent,
    BayarTeleponComponent
  ],
  imports: [
    CommonModule,
    TransaksiRoutingModule,
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
    TableModule,
    DialogModule,
    InputTextModule,
    InputMaskModule,
    ConfirmDialogModule,
    HttpClientModule,
    MessageModule,
    MessagesModule,
    ToastModule,
    InputNumberModule,
    SelectButtonModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.threeBounce,
        backdropBackgroundColour: 'rgba(255,255,255,0.3)',
        fullScreenBackdrop: true,
        primaryColour: '#FFBB57', secondaryColour: '#FFBB57', tertiaryColour: '#FFBB57'
    }),
    ProgressSpinnerModule,
  ]
})
export class TransaksiModule { }
