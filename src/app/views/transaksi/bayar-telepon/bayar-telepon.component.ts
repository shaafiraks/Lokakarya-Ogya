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
    bulanKe: new FormControl(0),

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
      bulanKe: [0, Validators.required],
      bulanTagihan :[0],
      idPelanggan: [0],
      namaPelanggan: [''],
    });
  }

  // ABSTRACT CONTROL
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  noRekening: any;
  noTelepon: any = 0;
  tagihan: any = 0;
  bulanTagihan:any ;
  nasabah: any = [];
  totalTagihan:any = [];
  infoBayar: any = [];
  display1: boolean = false;
  display2:boolean= false;
  submitted: boolean = false;
  cekError: boolean = false;
  tampilForm: boolean = false;
  tampilFormPerBulan:boolean = false;
  errorMessage:string = '';
  tampilDatatagihan:boolean = false;
  cekErrorBulanTagihan:boolean =false;
  loading:boolean = false;

  //FUNCTION BAYAR TELEPON SEKALIGUS
  onBayarTelepon() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    else {
      this.confirmationService.confirm({
        message: '<b>Konfirmasi Bayar Telepon : </b>',
        accept: () => {
          this.loading = true;
          let data = JSON.stringify(this.noRekening, this.noTelepon);
          console.log(data);
          console.log(this.noRekening);
          console.log(this.noTelepon);


          this.transaksiService.getBayartelepon(this.noRekening, this.noTelepon).subscribe({
            next: (resp: any) => {
              this.loading = false;
              this.display1 = true;
              this.tampilForm = false;
              this.nasabah = resp.data;
              this.messageService.add({ severity: 'success', summary: 'Transaksi Berhasil', detail: 'Tagihan telah dibayar' });
              console.log(resp);
              console.log(resp.data);

            },
            error: (error) => {
              this.loading = false;
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

  //FUNCTION BAYAR TELEPON PER-BULAN
  onBayarTeleponPerBulan(){
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    else {
      this.confirmationService.confirm({
        message: '<b>Konfirmasi Bayar Telepon : </b>',
        accept: () => {
          this.loading = true;
          let data = JSON.stringify(this.noRekening, this.noTelepon, this.bulanTagihan);
          console.log(data);
          console.log(this.noRekening);
          console.log(this.noTelepon);
          console.log(this.bulanTagihan);

          this.transaksiService.postBayarteleponPerBulan(this.noRekening, this.noTelepon, this.bulanTagihan).subscribe({
            next: (resp: any) => {
              this.loading = false;
              //boolean dialog
              this.display2 =true;
              this.nasabah = resp.data;
              this.messageService.add({ severity: 'success', summary: 'Transaksi Berhasil', detail: 'Tagihan telah dibayar' });
              console.log(resp);
              console.log(resp.data);

            },
            error: (error) => {
              this.loading = false;
              this.cekErrorBulanTagihan = true
              console.log(error);
              // this.errorMessage = error.error.message
              // this.messageService.add({ severity: 'error', summary: 'Error', detail: (error.error.message) });
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
    this.display2 = false;
    this.tampilForm = false;
    this.tampilFormPerBulan = false;
    this.tampilDatatagihan = false;
    this.cekErrorBulanTagihan=false;
    this.nasabah = [];
    this.totalTagihan = [];
    this.infoBayar = [];
    this.tagihan = 0;
    this.noTelepon = 0;
    this.form.controls['noRekening'].enable();
    this.form.controls['noTelepon'].enable();
  }

  //KLIK BATAL SAAT DIALOG ERROR
  onBatalError(){
    this.cekError =false;
  }

  //PANGGIL DATA NASABAH
  showNasabah(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    else {
      this.loading = true;
      let data = JSON.stringify(this.noRekening, this.noTelepon);
      console.log(data);
      this.transaksiService.findBayarTelepon(this.noRekening, this.noTelepon).subscribe({
        next: (resp: any) => {
          this.loading = false;
          this.tampilDatatagihan = true;
          this.nasabah = resp.data;
          console.log(resp);
          console.log(resp.data);
        },
        error: (error) => {
          this.loading = false;
          this.cekError = true;
          this.errorMessage = error.error.message;
          console.log(error);
        },
      });

    }
  }

  //FUNCTION MENAMPILKAN TOTAL TAGIHAN
  showTotalTagihan(){
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    else {
      this.loading = true;
      let data = JSON.stringify(this.noRekening, this.noTelepon);
      console.log(data);
      this.transaksiService.getTotalTagihan(this.noRekening, this.noTelepon).subscribe({
        next: (resp: any) => {
          this.loading = false;
          // this.display1 = true;
          this.totalTagihan = resp.data;
          console.log(resp);
          console.log(resp.data);
        },
        error: (error) => {
          this.loading = false;
          this.cekError = true;
          this.errorMessage = error.error.message;
          console.log(error);
        },
      });
    }

  }

  // MESSAGE ERROR 
  messageErrorInputBulanTagihan() {
    this.confirmationService.confirm({
      message: '<b>Masukkan Bulan Tagihan</b>',
      header: 'Pesan'
    });
  }

  //MENAMPILKAN FORM BAYAR TELEPON
  showFormBayarTelepon() {
    this.tampilForm = true;
    this.form.controls['noRekening'].disable();
    this.form.controls['noTelepon'].disable();
  }

  //MENAMPILKAN FORM BAYAR TELEPON PER-BULAN
  showFormBayarTeleponPerBulan(bulanTagihan : any){
    this.tampilFormPerBulan = true;
    this.form.controls['noRekening'].disable();
    this.form.controls['noTelepon'].disable();
    this.form.controls['bulanTagihan'].setValue(bulanTagihan);
    this.form.controls['bulanTagihan'].disable();
    console.log(bulanTagihan);
  }


  //BATAL FORM BAYAR TELEPON
  onBatal(){
    this.tampilForm = false;
    this.tampilFormPerBulan = false;
    this.form.controls['noRekening'].enable();
    this.form.controls['noTelepon'].enable();
  }
  
      //DOWNLOAD TRANSFER PDF
      downloadBayarTeleponPDF(idHistoryBank:any, idHistoryTelepon:any ) {
        this.loading = true;
        this.transaksiService.downloadBayarTelepon(idHistoryBank, idHistoryTelepon).subscribe({
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
            this.messageService=error.error.message;
            
          },
        });
      }
}
