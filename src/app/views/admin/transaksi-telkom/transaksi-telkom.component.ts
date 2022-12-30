import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { TransaksiTelkomInterface } from './transaksi-telkom-interface';
import { TransaksiTelkomService } from './transaksi.service';
import { MasterPelangganService } from '../master-pelanggan/master.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-transaksi-telkom',
  templateUrl: './transaksi-telkom.component.html',
  styleUrls: ['./transaksi-telkom.component.scss'],
  providers: 
  [ConfirmationService,
  CurrencyPipe],
})

export class TransaksiTelkomComponent implements OnInit {
  public cols: any = [];
  public transaksi: any = [];
  public pelanggan: any = [];
  transaksiform: boolean = false;
  header: string = '';
  isEdit: boolean = false;
  isAdd: boolean = false;
  isDelete: boolean = false;
  public dateValue : Date | undefined ;
  // editButton: boolean = false;

  

  showdelete(reference: TransaksiTelkomInterface) {
    this.form.setValue(reference);
    this.isEdit = false;
    this.isAdd = false;
    this.isDelete = true;
    this.header = 'Delete Transaksi';
    this.form.disable();
    this.transaksiform = true;
  }

  showAdd() {
    this.isEdit = false;
    this.isAdd = true;
    this.isDelete = false;
    this.header = 'Add Transaksi';
    this.form.reset();
    this.form.enable();
    this.transaksiform = true;
    this.form.controls['status'].setValue(1);
    this.form.controls['status'].disable();
  }

  showEdit(reference: TransaksiTelkomInterface) {
    this.isEdit = true;
    this.isAdd = false;
    this.isDelete = false;
    this.header = 'Edit Transaksi';
    this.form.enable();
    this.form.controls['idPelanggan'].disable();
    this.form.controls['idTransaksi'].disable();
    this.form.controls['status'].disable();
    this.form.setValue(reference);
    this.transaksiform = true;
  }

  form: FormGroup = new FormGroup({
    idTransaksi: new FormControl(0),
    idPelanggan: new FormControl(0),
    bulanTagihan: new FormControl(0),
    tahunTagihan: new FormControl(0),
    uang: new FormControl(0),
    status: new FormControl(0),
  });
  submitted = false;
  paramIdTransaksi: number = 0;

  constructor(
    private transaksiTelkomService: TransaksiTelkomService,
    private masterPelangganService: MasterPelangganService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService
  ) {}

  GetConfirmDelete() {
    this.confirmationService.confirm({
      message:
        'Transaksi dengan ID: ' +
        this.form.controls['idTransaksi'].value +
        ' telah berhasil dihapus',
      header: 'Transaksi dihapus',
    });
  }

  GetConfirmAdd() {
    this.confirmationService.confirm({
      message:
        'Berhasil menambahkan transaksi dengan ID Pelanggan:  ' +
        this.form.controls['idPelanggan'].value,
      header: 'Berhasil menambahkan transaksi',
    });
  }

  GetConfirmEdit() {
    this.confirmationService.confirm({
      message:
        'Berhasil memperbarui transaksi dengan ID = ' +
        this.form.controls['idTransaksi'].value,
      header: 'Transaksi diperbarui',
    });
  }

  refreshPage() {
    this.transaksiTelkomService.findAll().subscribe({
      next: (res: any) => {
        this.transaksi = res;
        // console.log(res);
      },
      error: (error) => {
        console.error('ini error: ', error);
      },
    });

    this.masterPelangganService.findAll().subscribe({
      next: (res: any) => {
        this.pelanggan = res;
        // console.log(res);
      },
      error: (error) => {
        console.error('ini error: ', error);
      }
    });
  }


  ngOnInit(): void {
    this.refreshPage();

    this.cols = [
      { field: 'idTransaksi', header: 'ID Transaksi' },
      { field: 'idPelanggan', header: 'ID Pelanggan' },
      { field: 'bulanTagihan', header: 'Bulan Tagihan' },
      { field: 'tahunTagihan', header: 'Tahun Tagihan' },
      { field: 'uang', header: 'Uang' },
      { field: 'status', header: 'Status' },
      
    ];

    this.form = this.formBuilder.group({
      idPelanggan: [0,  Validators.required],
      bulanTagihan: [
        0,
        [Validators.required, Validators.minLength(1), Validators.maxLength(2)],
      ],
      tahunTagihan: [
        0,
        [Validators.required, Validators.minLength(1), Validators.maxLength(4)],
      ],
      uang: [0, [Validators.required, Validators.maxLength(8)]],
      status: [1, Validators.required],
      idTransaksi: [0],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    } else {
      if (this.isEdit || this.isAdd) {
        this.form.enable();

    
      }
      let data = JSON.stringify(this.form.value);
      console.log(data);

      if (this.isEdit) {
        this.form.controls['idTransaksi'].disable();
        this.form.controls['idPelanggan'].disable();
        this.form.controls['status'].disable();
      }

      if (this.isAdd) {
        this.form.controls['status'].disable();
     }

      if (this.isAdd) {
        this.transaksiTelkomService.addTransaksi(data).subscribe({
          next: (res: any) => {
            console.log(res);
            this.transaksiform = false;
            this.GetConfirmAdd();
            this.onReset();
          },
          error: (error) => {
            console.error('ini error: ', error);
            alert(error.error.message);
          }
        });
      }
      if (this.isEdit) {
        this.transaksiTelkomService.editTransaksi(data).subscribe({
          next: (res: any) => {
            console.log(res);
            this.transaksiform = false;
            this.GetConfirmEdit();
            this.onReset();
          },
          error: (error) => {
            console.error('ini error: ', error);
            alert(error.error.message);
          }
        });
      }

      if (this.isDelete) {
        this.transaksiTelkomService.deleteTransaksi(this.form.controls['status'].value).subscribe({
          next: (res: any) => {
            this.onReset();
            this.transaksiform = false;
            // console.log(res);
          },
          error: (error) => {
            console.error('ini error: ', error);
          }
        });
      }
    }
  }

  onReset(): void {
    this.submitted = false;
    if (this.isEdit) {
      let temp : number = this.form.controls['status'].value;
      this.form.reset();
      this.form.controls['idTransaksi'].setValue(temp);
    } else {
      this.form.reset();
    }
    this.refreshPage();
  }

  onDelete(): void {
    this.submitted = false;
    this.transaksiform = false;
    this.GetConfirmDelete();
  }
}
