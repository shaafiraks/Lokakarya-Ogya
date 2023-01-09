import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, ConfirmEventType, MessageService, PrimeNGConfig,  } from 'primeng/api';
import { TransaksiService } from '../transaksi.service';
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss'],
  providers: [CurrencyPipe],
})
export class TransferComponent implements OnInit {

  form: FormGroup = new FormGroup({
    cekSaldo: new FormControl(0),
    norekAsal: new FormControl(0),
    norekTujuan: new FormControl(0),
    nominal: new FormControl(0),

  });

  constructor(
    private transaksiService: TransaksiService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private currencyPipe: CurrencyPipe,
    private primeNGConfig: PrimeNGConfig,
  ) {

    this.stateOptions1 = [{ label: '50.000', value: 50000 },];
    this.stateOptions2 = [{ label: '100.000', value: 100000 },];
    this.stateOptions3 = [{ label: '150.000', value: 150000 },];
    this.stateOptions4 = [{ label: '200.000', value: 200000 },];
    this.stateOptions5 = [{ label: '300.000', value: 300000 },];
    this.stateOptions6 = [{ label: '500.000', value: 500000 },];
  }

  ngOnInit(): void {
    // VALIDATOR
    this.form = this.formBuilder.group({
      norekAsal: [0, Validators.required],
      norekTujuan: [0, Validators.required],
      nominal: [0, Validators.required],
      cekSaldo: [0, Validators.required],
    });
  }

  // ABSTRACT CONTROL
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  norekAsal: any;
  norekTujuan: any = 0;
  nominal: any = 0;
  nasabah: any = [];
  display1: boolean = false;
  submitted: boolean = false;
  cekError: boolean = false;
  tampilForm: boolean = false;
  stateOptions1: any = [];
  stateOptions2: any = [];
  stateOptions3: any = [];
  stateOptions4: any = [];
  stateOptions5: any = [];
  stateOptions6: any = [];
  value1: number = 0;
  tampilFormPilihanNominal: boolean = false;
  errorMessage : string ='';

  onTransfer() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    else {
      this.confirmationService.confirm({
        message: '<b>Konfirmasi Transfer Dengan Nominal : </b>' + this.currencyPipe.transform(this.nominal, 'IDR ', 'symbol', '3.2-2'),
        accept: () => {
          let data = JSON.stringify(this.norekAsal, this.norekTujuan, this.nominal);
          console.log(data);
          // console.log(this.norekAsal);
          this.transaksiService.getTransfer(this.norekAsal, this.norekTujuan, this.nominal).subscribe({
            next: (resp: any) => {
              this.display1 = true;
              this.tampilForm = false;
              this.nasabah[0] = resp.data;
              this.messageService.add({ severity: 'success', summary: 'Transaksi Berhasil', detail: 'Uang telah ditarik' });
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
    this.submitted = false;
    this.cekError = false;
    this.display1 = false;
    this.form.reset();
    this.tampilForm = false;
    this.nasabah = [];
    this.nominal = 0;
    this.norekTujuan = 0;
    this.tampilFormPilihanNominal = false;
  }

  //PANGGIL SEMUA DATA NASABAH
  showNasabah(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    else {
      let data = JSON.stringify(this.norekAsal);
      console.log(data);
      this.transaksiService.getNasabah(this.norekAsal).subscribe({
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

  // MESSAGE ERROR 
  messageError() {
    this.confirmationService.confirm({
      message: '<b>Nomor Rekening Salah</b>',
      header: 'Pesan'
    });
  }

  //MENAMPILKAN FORM TARIK TUNAI
  showFormTransfer() {
    this.tampilForm = true;
    this.form.controls['norekAsal'].disable();
    this.nominal = 0;
  }

  showFormPilihanNominal() {
    this.tampilFormPilihanNominal = true;
    this.form.controls['norekAsal'].disable();
  }

  onBatalFormPilihanNominal() {
    this.tampilFormPilihanNominal = false;
  }

  onBatalFormTarik() {
    this.tampilForm = false;
  }

  onTutupDialog(){
    this.cekError = false
  }

}
