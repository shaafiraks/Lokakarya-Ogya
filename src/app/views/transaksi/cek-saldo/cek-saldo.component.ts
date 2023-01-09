import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TransaksiService } from '../transaksi.service'
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cek-saldo',
  templateUrl: './cek-saldo.component.html',
  styleUrls: ['./cek-saldo.component.scss'],
  providers: [CurrencyPipe],
})
export class CekSaldoComponent implements OnInit {

  constructor(
    private transaksiService: TransaksiService,
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder,
    // private messageService: MessageService
    private currencyPipe: CurrencyPipe,



  ) { }

  // FORM CONTROL
  form: FormGroup = new FormGroup({
    cekSaldo: new FormControl(0)
  });

  ngOnInit(): void {
    // VLAIDATOR
    this.form = this.formBuilder.group({
      cekSaldo: [0, Validators.required],
    })

  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  norek: any;
  nasabah: any = [];
  display1: boolean = false;
  submitted: boolean = false;



  //FUNCTION MEMUNCULKAN NASABAH
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
          this.display1 = true;
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

  messageError() {
    this.confirmationService.confirm({
      message: '<b>Nomor Rekening Tidak Ditemukan</b>',
      header: 'Pesan'
    });
  }

  findAll(): void {
    this.transaksiService.getAllNasabah().subscribe({
      next: (resp) => {
        this.nasabah = resp;
        console.log(resp);

      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
    this.display1 = false;
  }

}
