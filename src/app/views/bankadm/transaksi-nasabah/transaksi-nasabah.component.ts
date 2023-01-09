import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { MasterBankService } from '../master-bank/master-bank.service';
import { TransaksiNasabahInterface } from './transaksi-nasabah-interface';
import {TransaksiNasabahService} from './transaksi-nasabah.service';

@Component({
  selector: 'app-transaksi-nasabah',
  templateUrl: './transaksi-nasabah.component.html',
  styleUrls: ['./transaksi-nasabah.component.scss']
})
export class TransaksiNasabahComponent implements OnInit {

  public cols: any = [];
  public transaksiNasabah: any = [];
  public listMasterBank: any = [];
  transaksiNasabahForm: boolean = false;
  header: string = "";
  // isEdit: boolean = false;
  // isAdd: boolean = false;
  // isDelete: boolean = false;

  // showdelete(reference: TransaksiNasabahInterface) {
  //   this.form.setValue(reference);
  //   this.isEdit = false;
  //   this.isAdd = false;
  //   this.isDelete = true;
  //   this.header = "Delete Transaksi";
  //   this.form.disable();
  //   this.transaksiNasabahForm = true;
  // }

  // showAdd() {
  //   this.isEdit = false;
  //   this.isAdd = true;
  //   this.isDelete = false;
  //   this.header = "Add Transaksi";
  //   this.form.reset();
  //   this.form.enable();
  //   this.transaksiNasabahForm = true;
  // }

  // showEdit(reference: TransaksiNasabahInterface) {
  //   this.isEdit = true;
  //   this.isAdd = false;
  //   this.isDelete = false;
  //   this.header = "Edit Nasabah";
  //   this.form.enable();
  //   this.form.controls['norek'].disable();
  //   this.form.controls['nama'].disable();
  //   this.form.setValue(reference);
  //   this.transaksiNasabahForm = true;
  // }


  form: FormGroup = new FormGroup({
    norek: new FormControl(0),
    idTransaksiNasabah: new FormControl(0),
    nama: new FormControl(''),
    tanggel: new FormControl(''),
    status: new FormControl(''),
    uang: new FormControl(0),
    statusKet: new FormControl(0),
    no_tlp: new FormControl(0),
    noRekTujuan: new FormControl(0),
  });
  // submitted = false;
  // paramnorek: number = 0;

  constructor(
    private masterBankService: MasterBankService,
    private transaksiNasabahService: TransaksiNasabahService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
  ) { }

  // GetConfirmDelete() {
  //   this.confirmationService.confirm({
  //     message: 'Transaksi with nomor rekening = ' + this.form.controls['norek'].value + ' has been successfully deleted',
  //     header: 'Transaksi Deleted',
  //   });
  // }

  // getConfirmAdd() {
  //   this.confirmationService.confirm({
  //     message: 'Created Transaksi data with Transaksi id = '+this.form.controls['idTransaksiNasabah'].value,
  //     header: 'Transaksi Created',
  //   });
  // }

  // getConfirmEdit() {
  //   this.confirmationService.confirm({
  //     message: 'Updated Transaksi data with nomor rekening= '+this.form.controls['norek'].value,
  //     header: 'Transaksi Updated',
  //   });
  // }

  refreshPage() {
    this.transaksiNasabahService.findAll().subscribe({
      next: (res: any) => {
        this.transaksiNasabah = res;
        // console.log(res);
      },
      error: (error) => {
        console.error('ini error: ', error);
      }
    });

    this.masterBankService.findAll().subscribe({
      next: (res: any) => {
        this.listMasterBank = res;
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
      { field: 'norek', header: 'Nomor Rekening' },
      { field: 'idTransaksiNasabah', header: 'Id Transaksi Nasabah' },
      { field: 'nama', header: 'Nama Nasabah'},
      { field: 'tanggel', header: 'Tanggal' },
      { field: 'status', header: 'Status' },
      { field: 'uang', header: 'Nominal' },
      { field: 'statusKet', header: 'Keterangan' },
      { field: 'no_tlp', header: 'Nomor Telepon' },
      { field: 'noRekTujuan', header: 'Nomor Rekening Tujuan' },
      
  ];
    this.form = this.formBuilder.group({
      norek: [0, Validators.required],
      idTransaksiNasabah: [0,],
      nama: ['', Validators.required ],
      tanggel: ['',Validators.required],
      status: ['',Validators.required],
      uang: [0,  Validators.required,],
      statusKet: [0, Validators.required,],
      noRekTujuan: [0,],
      no_tlp: [0,],
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    // this.submitted = true;

    // if (this.form.invalid) {
    //   return;
    // } else {
    //   if (this.isEdit) {
    //     this.form.controls['norek'].enable();
    //   }
    //   let data = JSON.stringify(this.form.value);
    //   console.log(data);
    //   if (this.isEdit) {
    //     this.form.controls['norek'].disable();
    //   }

    //   if (this.isAdd) {
    //     this.transaksiNasabahService.addTransaksiNasabah(data).subscribe({
    //       next: (res: any) => {
    //         console.log(res);
    //         this.transaksiNasabahForm = false;
    //         this.getConfirmAdd();
    //         this.onReset();
    //       },
    //       error: (error) => {
    //         console.error('ini error: ', error);
    //         alert(error.error.message);
    //       }
    //     });
    //   };

    //   if (this.isEdit) {
    //     this.transaksiNasabahService.editTransaksiNasabah(data).subscribe({
    //       next: (res: any) => {
    //         console.log(res);
    //         this.transaksiNasabahForm = false;
    //         this.getConfirmEdit();
    //         this.onReset();
    //       },
    //       error: (error) => {
    //         console.error('ini error: ', error);
    //         alert(error.error.message);
    //       }
    //     });
    //   };

    //   if (this.isDelete) {
    //     this.transaksiNasabahService.deleteTransaksiNasabah(this.form.controls['norek'].value).subscribe({
    //       next: (res: any) => {
    //         this.onReset();
    //         this.transaksiNasabahForm = false;
    //         // console.log(res);
    //       },
    //       error: (error) => {
    //         console.error('ini error: ', error);
    //       }
    //     });
    //   }

    // }
  }

  onReset(): void {
    // this.submitted = false;
    // if (this.isEdit) {
    //   let temp : number = this.form.controls['norek'].value;
    //   this.form.reset();
    //   this.form.controls['norek'].setValue(temp);
    // } else {
    //   this.form.reset();
    // }
    // this.refreshPage();
  }

  onDelete(): void {
    // this.submitted = false;
    // this.transaksiNasabahForm = false;
    // this.GetConfirmDelete();
  }

}
