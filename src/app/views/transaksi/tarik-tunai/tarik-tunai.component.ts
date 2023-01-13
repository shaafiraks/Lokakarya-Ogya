import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { reduce } from 'rxjs';
import { TransaksiService } from '../transaksi.service';
import { CurrencyPipe, ViewportScroller } from '@angular/common';
import { SelectItem, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-tarik-tunai',
  templateUrl: './tarik-tunai.component.html',
  styleUrls: ['./tarik-tunai.component.scss'],
  providers: [CurrencyPipe],
})
export class TarikTunaiComponent implements OnInit {

  // FORM CONTROL
  form: FormGroup = new FormGroup({
    cekSaldo: new FormControl(0),
    norek: new FormControl(0),
    nominal: new FormControl(0),
  });

  ngOnChanges() {
    this.scroller.scrollToPosition([100, 200]);
  }

  constructor(
    private transaksiService: TransaksiService,
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private currencyPipe: CurrencyPipe,
    private primeNGConfig: PrimeNGConfig,
    private scroller: ViewportScroller,
  ) {

    this.stateOptions1 = [{ label: '50.000', value: 50000 },];
    this.stateOptions2 = [{ label: '100.000', value: 100000 },];
    this.stateOptions3 = [{ label: '150.000', value: 150000 },];
    this.stateOptions4 = [{ label: '200.000', value: 200000 },];
    this.stateOptions5 = [{ label: '300.000', value: 300000 },];
    this.stateOptions6 = [{ label: '500.000', value: 500000 },];
  }
  //END CONSTRUCTOR


  ngOnInit(): void {
    // VALIDATOR
    this.form = this.formBuilder.group({
      norek: [0, Validators.required],
      nominal: [0, Validators.required],
      cekSaldo: [0, Validators.required],
    });

    this.primeNGConfig.ripple = true;
  }

  // ABSTRACT CONTROL
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  norek: any;
  nominal: any = 0;
  nasabah: any = [];
  display1: boolean = false;
  // classButton: string = "";
  // bgConfirmColor: string = "";
  submitted: boolean = false;
  cekError: boolean = false;
  // merah: any = 'background-color: aqua;';
  tampilForm: boolean = false;
  stateOptions1: any = [];
  stateOptions2: any = [];
  stateOptions3: any = [];
  stateOptions4: any = [];
  stateOptions5: any = [];
  stateOptions6: any = [];
  value1: number = 0;
  tampilFormPilihanNominal: boolean = false;
  errorMessage:string = '';
  tampilDataNasabah:boolean = false;
  loading:boolean = false;
  // //UNTUK MENGUBAH KE FORMAT RUPIAH
  // formattedValue = this.currencyPipe.transform(this.nominal, 'IDR', true);




  // PANGGIL SERVICE GET TARIK TUNAI
  onTarikTunai() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    else {
      this.confirmationService.confirm({
        message: '<b>Konfirmasi Tarik Tunai Dengan Nominal : Rp. </b>' + this.currencyPipe.transform(this.nominal, 'IDR ', 'symbol', '3.2-2'),
        accept: () => {
          this.loading = true;
          let data = JSON.stringify(this.norek, this.nominal);
          console.log(data);
          console.log(this.norek, this.nominal);
          this.transaksiService.getTarikTunai(this.norek, this.nominal).subscribe({
            next: (resp: any) => {
              this.loading = false;
              // this.messageSuccess();
              this.tampilForm = false;
              this.display1 = true;
              this.nasabah[0] = resp.data;
              this.messageService.add({ severity: 'success', summary: 'Transaksi Berhasil', detail: 'Uang telah ditarik' });
              console.log(resp);
              console.log(resp.data);

            },
            error: (error) => {
              this.loading = false;
              this.cekError = true;
              this.tampilForm = false;
              this.errorMessage = error.error.message
              // this.messageErrorNoRek();
              // this.messageService.add({ severity: 'error', summary: 'Error', detail: (error.error.message) }); console.log(error);
              // alert('Id tidak ditemukan')
            },
          });
        },
        // reject: (type: any) => {
        //   switch (type) {
        //     case ConfirmEventType.REJECT:
        //       this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
        //       break;
        //     case ConfirmEventType.CANCEL:
        //       this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
        //       break;
        //   }
        // }
      });
    }

  }

  goDown1() {
    this.scroller.scrollToAnchor("dataNasabah");
  }

  onChange() {

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
    this.tampilFormPilihanNominal = false;
    this.tampilDataNasabah= false;
  }

  //RESET PADA DIALOG ERROR
  onResetError(){
    this.cekError = false;
  }

  //PANGGIL SEMUA DATA NASABAH
  showNasabah(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    else {
      this.loading = true;
      let data = JSON.stringify(this.norek);
      console.log(data);
      this.transaksiService.getNasabah(this.norek).subscribe({
        next: (resp: any) => {
          this.loading = false;
          this.tampilDataNasabah= true;
          this.nasabah[0] = resp.data;
          console.log(resp);
          console.log(resp.data);
        },
        error: (error) => {
          this.loading = false;
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
  showFormTarik() {
    this.tampilForm = true;
    // this.tampilFormPilihanNominal = false;
    this.form.controls['norek'].disable();
    this.nominal = 0;
  }

  //MENAMPILKAN FORM DENGAN PILIHAN
  showFormPilihanNominal() {
    this.tampilFormPilihanNominal = true;
    this.form.controls['norek'].disable();
  }

  onBatalFormPilihanNominal() {
    this.tampilFormPilihanNominal = false;
  }

  onBatalFormTarik() {
    this.tampilForm = false;
  }

    //DOWNLOAD TARIK TUNAI PDF
    downloadTarikTunaiPDF(idHistory:any) {
      this.loading = true;
      this.transaksiService.downloadTarikTunai(idHistory).subscribe({
        next: (resp) => {
          this.loading = false;
          let binaryData = [];
          binaryData.push(resp);
          var fileUrl = URL.createObjectURL(new Blob(binaryData, { type: 'application/pdf'}));
          window.open(fileUrl);
          // saveAs(resp, 'Data-Setor.pdf')
          console.log(resp);        
        },
        error: (error) => {
          this.loading = false;
          console.log(error);
          this.errorMessage = error.error.message;
          
        },
      })
    }

}
