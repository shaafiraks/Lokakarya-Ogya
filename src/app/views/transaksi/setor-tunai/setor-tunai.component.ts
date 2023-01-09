import { Component, OnInit } from '@angular/core';
import { AbstractControl, Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TransaksiService } from '../transaksi.service';
import { SetorTunaiInterface } from './setor-tunai-interface'
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-setor-tunai',
  templateUrl: './setor-tunai.component.html',
  styleUrls: ['./setor-tunai.component.scss'],
  providers: [CurrencyPipe],
})
export class SetorTunaiComponent implements OnInit {

  // FORM CONTROL
  form: FormGroup = new FormGroup({
    cekSaldo: new FormControl(0),
    norek: new FormControl(0),
    nominal: new FormControl(0),

  });

  constructor(
    private transaksiService: TransaksiService,
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private currencyPipe: CurrencyPipe,

  ) { }

  ngOnInit(): void {
    // VALIDATOR
    this.form = this.formBuilder.group({
      norek: [0, Validators.required],
      nominal: [0, Validators.required],
      cekSaldo: [0, Validators.required],
    });
  }

  // ABSTRACT CONTROL
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  norek: any;
  nominal: any = 0;
  nasabah: any = [];
  display1: boolean = false;
  classButton: string = "";
  submitted: boolean = false;
  // bgConfirmColor: string = "";
  cekNorek: boolean = false;
  tampilForm: boolean = false;
  errorMessage:string = '';




  onSetorTunai() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    else {
      this.confirmationService.confirm({
        message: '<b>Konfirmasi Setor Tunai Dengan Nominal : </b>' + this.currencyPipe.transform(this.nominal, 'IDR ', 'symbol', '3.2-2'),
        accept: () => {
          let data = JSON.stringify(this.norek, this.nominal);
          console.log(data);
          console.log(this.norek);
          this.transaksiService.getSetorTunai(this.norek, this.nominal).subscribe({
            next: (resp: any) => {
              this.tampilForm = false;
              this.display1 = true;
              // this.messageSuccess();
              this.nasabah[0] = resp.data;
              this.messageService.add({ severity: 'success', summary: 'Transaksi Berhasil', detail: 'Uang telah disetor' });
              console.log(resp);
              console.log(resp.data);

            },
            error: (error) => {
              this.cekNorek = true;
              console.log(error);
              this.errorMessage = error.error.message
              this.messageService.add({ severity: 'error', summary: 'Error', detail: (error.error.message) });
              // alert('Id tidak ditemukan')
            },
          });
        },
        reject: (type: any) => {
          switch (type) {
            case ConfirmEventType.REJECT:
              this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
              break;
            case ConfirmEventType.CANCEL:
              this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
              break;
          }
        }
      });
    }
  }
  //RESET FORM DAN SET FALSE PADA BOOLEAN
  onReset() {
    this.submitted = false;
    this.cekNorek = false;
    this.display1 = false;
    this.form.reset();
    this.tampilForm = false;
    this.nasabah = [];
    this.nominal = 0;
  }

  //PANGGIL SEMUA DATA NASABAH
  showNasabah(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    else {
      let data = JSON.stringify(this.norek);
      console.log(data);
      this.transaksiService.getNasabah(this.norek).subscribe({
        next: (resp: any) => {
          // this.display1 = true;
          this.nasabah[0] = resp.data;
          console.log(resp);
          console.log(resp.data);
        },
        error: (error) => {
          this.messageError();
          console.log(error);
          // alert('Id tidak ditemukan')
          // this.onReset();
        },
      });
      //RESET FORM CEK SALDO
      // this.norek=null;
      // this.onReset();
    }
  }



  //PESAN ERROR NOMINAL KOSONG
  messageErrorSaldo() {
    this.classButton = "p-button-danger";
    this.confirmationService.confirm({
      message: '<b>Masukkan nominal Setor</b>',
      header: 'Pesan'
    });
  }

  // MESSAGE ERROR 
  messageError() {
    this.confirmationService.confirm({
      message: '<b>Nomor Rekening Tidak Ditemukan</b>',
      header: 'Pesan'
    });
  }

  // PESAN BERHASIL
  messageSuccess() {
    this.classButton = "p-button-success";
    this.confirmationService.confirm({
      message: '<b>Setor Tunai Berhasil</b>',
      header: 'Pesan'
    });
  }

  //MENAMPILKAN FORM TARIK TUNAI
  showFormSetor() {
    this.tampilForm = true;
    this.form.controls['norek'].disable();
  }

}
