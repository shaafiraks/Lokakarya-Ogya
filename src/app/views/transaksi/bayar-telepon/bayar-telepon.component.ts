import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { TransaksiService } from '../transaksi.service';

@Component({
  selector: 'app-bayar-telepon',
  templateUrl: './bayar-telepon.component.html',
  styleUrls: ['./bayar-telepon.component.scss'],
  providers: [CurrencyPipe],
})
export class BayarTeleponComponent implements OnInit {

  form: FormGroup = new FormGroup({
    cekSaldo: new FormControl(0),
    noRekening: new FormControl(0),
    namaRekening: new FormControl(''),
    noTelepon: new FormControl(0),
    tagihan: new FormControl(0),
    namaPelanggan: new FormControl(''),
    saldo: new FormControl(0),
    status: new FormControl(''),

  });

  constructor(
    private transaksiService: TransaksiService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {



    // VALIDATOR
    this.form = this.formBuilder.group({
      noRekening: [0, Validators.required],
      noTelepon: [0, Validators.required],
      cekSaldo: [0, Validators.required],
    });
  }

  // ABSTRACT CONTROL
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  noRekening: any;
  noTelepon: any = 0;
  tagihan: any = 0;
  nasabah: any = [];
  infoBayar: any = [];
  display1: boolean = false;
  submitted: boolean = false;
  cekError: boolean = false;
  tampilForm: boolean = false;
  errorMessage:string = '';

  onBayarTelepon() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    else {
      this.confirmationService.confirm({
        message: '<b>Konfirmasi Bayar Telepon : </b>',
        accept: () => {
          let data = JSON.stringify(this.noRekening, this.noTelepon);
          console.log(data);
          console.log(this.noRekening);
          console.log(this.noTelepon);


          this.transaksiService.getBayartelepon(this.noRekening, this.noTelepon).subscribe({
            next: (resp: any) => {
              this.display1 = true;
              this.tampilForm = false;
              this.nasabah = resp.data;
              this.messageService.add({ severity: 'success', summary: 'Transaksi Berhasil', detail: 'Tagihan telah dibayar' });
              console.log(resp);
              console.log(resp.data);

            },
            error: (error) => {
              this.cekError = true;
              // this.messageError();
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
    // this.submitted = false;
    this.cekError = false;
    this.display1 = false;
    this.tampilForm = false;
    this.nasabah = [];
    this.infoBayar = [];
    this.tagihan = 0;
    this.noTelepon = 0;
    this.form.controls['noRekening'].enable();
    this.form.controls['noTelepon'].enable();
  }

  //PANGGIL DATA NASABAH
  showNasabah(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    else {
      let data = JSON.stringify(this.noRekening, this.noTelepon);
      console.log(data);
      this.transaksiService.findBayarTelepon(this.noRekening, this.noTelepon).subscribe({
        next: (resp: any) => {
          // this.display1 = true;
          this.nasabah = resp.data;
          console.log(resp);
          console.log(resp.data);
        },
        error: (error) => {
          this.messageErrorNorekOrNoTelpSalah();
          console.log(error);
        },
      });

    }
  }

  // MESSAGE ERROR 
  messageErrorNorekOrNoTelpSalah() {
    this.confirmationService.confirm({
      message: '<b>Perhatikan Nomor Rekening dan Nomor Telepon Anda</b>',
      header: 'Pesan'
    });
  }

  //MENAMPILKAN FORM BAYAR TELEPON
  showFormBayarTelepon() {
    this.tampilForm = true;
    this.form.controls['noRekening'].disable();
    this.form.controls['noTelepon'].disable();
  }


  //BATAL FORM BAYAR TELEPON
  onBatal(){
    this.tampilForm = false;
    this.form.controls['noRekening'].enable();
    this.form.controls['noTelepon'].enable();
  }

}
