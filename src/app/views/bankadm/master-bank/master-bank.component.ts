import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { MasterBankInterface } from './master-bank-interface';
import { MasterBankService } from './master-bank.service'
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-master-bank',
  templateUrl: './master-bank.component.html',
  styleUrls: ['./master-bank.component.scss'],
  providers: [CurrencyPipe]
})
export class MasterBankComponent implements OnInit {

  //variabel-variabel untuk menampung data
  public cols: any = [];
  public masterBank: any = [];
  public users: any = [];
  public selectedUser: any = [];
  masterBankform: boolean = false;
  header: string = "";
  isEdit: boolean = false;
  isAdd: boolean = false;
  isDelete: boolean = false;
  submitted = false;
  paramnorek: number = 0;
  searchQuery: string = '';

  //function untuk delete 
  showDelete(reference: MasterBankInterface) {
    this.form.setValue(reference);
    this.isEdit = false;
    this.isAdd = false;
    this.isDelete = true;
    this.header = "Delete Data Nasabah";
    this.form.disable();
    this.masterBankform = true;
  }

  //function untuk add
  showAdd() {
    this.isEdit = false;
    this.isAdd = true;
    this.isDelete = false;
    this.header = "Add Data Nasabah Baru";
    this.form.reset();
    this.form.enable();
    this.form.controls['nama'].disable();
    this.form.controls['alamat'].disable();
    this.form.controls['notlp'].disable();
    this.masterBankform = true;
  }

  //function untuk edit
  showEdit(reference: MasterBankInterface) {
    this.isEdit = true;
    this.isAdd = false;
    this.isDelete = false;
    this.form.setValue(reference);
    this.header = "Edit Data Nasabah";
    this.form.enable();
    this.form.controls['norek'].disable();
    this.masterBankform = true;
  }

  //
  form: FormGroup = new FormGroup({
    norek: new FormControl(0),
    nama: new FormControl(''),
    alamat: new FormControl(''),
    notlp: new FormControl(0),
    saldo: new FormControl(0),
    userId: new FormControl(0),
  });

  constructor(
    private masterBankService: MasterBankService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
  ) { }

  //set data user ke masterbank
  changeSelect(event: any) {
    // console.log(event.target.value);
    // console.log(this.users);
    this.masterBankService.findUserById(event.target.value).subscribe({
      next: (res: any) => {
        this.selectedUser = res.data[0];
        this.form.controls['nama'].setValue(this.selectedUser.nama);
        this.form.controls['alamat'].setValue(this.selectedUser.alamat);
        this.form.controls['notlp'].setValue(this.selectedUser.telp);
      },
      error: (error) => {
        console.error('ini error: ', error);
      }
    });
  }

  //konfirmasi delete 
  GetConfirmDelete() {
    this.confirmationService.confirm({
      message: 'Data nasabah dengan nomor rekening = ' + this.form.controls['norek'].value + ' berhasil dihapus',
      header: 'Nasabah Deleted',
    });
  }

  //konfirmasi add 
  getConfirmAdd() {
    this.confirmationService.confirm({
      message: 'Berhasil menambahkan data nasabah dengan nama = ' + this.form.controls['nama'].value,
      header: 'Nasabah Created',
    });
  }

  //konfirmasi edit 
  getConfirmEdit() {
    this.confirmationService.confirm({
      message: ' Data nasabah dengan nomor rekening = ' + this.form.controls['norek'].value + ' berhasil diubah',
      header: 'Nasabah Updated',
    });
  }

  //get data dari service
  getData() {
    this.masterBankService.findAll().subscribe({
      next: (res: any) => {
        this.masterBank = res;
        // console.log(res);
      },
      error: (error) => {
        console.error('ini error: ', error);
      }
    });

    this.masterBankService.findAllUser().subscribe({
      next: (res: any) => {
        this.users = res;
        // console.log(res);
      },
      error: (error) => {
        console.error('ini error: ', error);
      }
    });
  }


  ngOnInit(): void {
    this.getData();

    this.form = this.formBuilder.group({
      norek: [0,],
      nama: ['', Validators.required],
      alamat: ['', Validators.required],
      notlp: [0, Validators.required],
      saldo: [0, Validators.required],
      userId: [0,],
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    // console.log(this.form.controls["saldo"], "ini saldonya")
    if (this.form.invalid) {
      return;
    } else {
      if (this.isAdd) {
        this.form.controls['nama'].enable();
        this.form.controls['alamat'].enable();
        this.form.controls['notlp'].enable();
      }
      if (this.isEdit) {
        this.form.controls['norek'].enable();
      }
      let data = JSON.stringify(this.form.value);
      // console.log(data, "zzzz");
      if (this.isAdd) {
        this.form.controls['nama'].disable();
        this.form.controls['alamat'].disable();
        this.form.controls['notlp'].disable();
      }
      if (this.isEdit) {
        this.form.controls['norek'].disable();
      }

      if (this.isAdd) {
        this.masterBankService.addNasabah(data).subscribe({
          next: (res: any) => {
            // console.log(res);
            this.masterBankform = false;
            this.getConfirmAdd();
            this.onReset();
          },
          error: (error) => {
            console.error('ini error: ', error);
            alert(error.error.message);
          }
        });
      };

      if (this.isEdit) {
        this.masterBankService.editNasabah(data).subscribe({
          next: (res: any) => {
            // console.log(res);
            this.masterBankform = false;
            this.getConfirmEdit();
            this.onReset();
          },
          error: (error) => {
            console.error('ini error: ', error);
            alert(error.error.message);
          }
        });
      };

      if (this.isDelete) {
        this.masterBankService.deleteNasabah(this.form.controls['norek'].value).subscribe({
          next: (res: any) => {
            // this.onReset();
            this.masterBankform = false;
            //console.log(res);
            this.getData();
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
      let temp: number = this.form.controls['norek'].value;
      this.form.reset();
      this.form.controls['norek'].setValue(temp);
    } else {
      this.form.reset();
    }
    this.getData();
  }

  onDelete(): void {
    this.submitted = false;
    this.masterBankform = false;
    this.GetConfirmDelete();
  }

}