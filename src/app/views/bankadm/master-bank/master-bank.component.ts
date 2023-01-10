import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, MinValidator, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
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
  cekError: boolean = false; //menampilkan error
  cekErrorDel: boolean = false; //menampilkan error
  berhasilDelete: boolean = false; //menampilkan error
  
  //menampilkan form untuk delete 
  showDelete(reference: MasterBankInterface) {
    this.form.setValue(reference);
    this.isEdit = false;
    this.isAdd = false;
    this.isDelete = true;
    this.header = "Delete Data Nasabah";
    this.form.disable();
    this.masterBankform = true;
  }

  //menampilkan form untuk add
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

  //menampilkan form untuk edit
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

  form: FormGroup = new FormGroup({
    norek: new FormControl(0),
    nama: new FormControl(''),
    alamat: new FormControl(''),
    notlp: new FormControl(0),
    saldo: new FormControl(0),
    userId: new FormControl(0),
  });

  constructor(
    private messageService: MessageService,
    private masterBankService: MasterBankService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
  ) { }

  //set data user ke masterbank
  changeSelect(event: any) {
    // console.log(event.target.value);
    // console.log(this.users);

    //memanggil service get by id dari user untuk add data data nasabah
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
  // GetConfirmDelete() {
  //   this.confirmationService.confirm({
  //     message: 'Data nasabah dengan nomor rekening = ' + this.form.controls['norek'].value + ' berhasil dihapus',
  //     header: 'Nasabah Deleted',
  //   });
  // }

  //konfirmasi add 
  GetConfirmAdd() {
    this.confirmationService.confirm({
      message: 'Berhasil menambahkan data nasabah dengan nama = ' + this.form.controls['nama'].value,
      header: 'Nasabah Created',
      accept: () => {
        this.onSubmit();
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Nasabah Added',
        });
      },
    });
  }

  //konfirmasi edit 
  GetConfirmEdit() {
    this.confirmationService.confirm({
      message: ' Data nasabah dengan nomor rekening = ' + this.form.controls['norek'].value + ' berhasil diubah',
      header: 'Nasabah Updated',
    });
  }

  //get data dari service
  getData() {

    //memanggil service find all data master bank
    this.masterBankService.findAll().subscribe({
      next: (res: any) => {
        this.masterBank = res;
        // console.log(res);
      },
      error: (error) => {
        console.error('ini error: ', error);
      }
    });

    //memanggil service find all data user 
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

    //validasi di form
    this.form = this.formBuilder.group({
      norek: [0,],
      nama: ['', Validators.required],
      alamat: ['', Validators.required],
      notlp: [0, Validators.required],
      saldo: [0, [Validators.required, Validators.min(10000)]],
      userId: [0,],
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    } else {
      if(this.isAdd){
        this.form.controls['nama'].enable();
        this.form.controls['alamat'].enable();
        this.form.controls['notlp'].enable();
      }

      if (this.isEdit) {
        this.form.controls['norek'].enable();
      }
      
      let data = JSON.stringify(this.form.value);

      if (this.isEdit) {
        this.form.controls['norek'].disable();
      }

      //add nasabah
      if (this.isAdd) {
        this.masterBankService.addNasabah(data).subscribe({
          next: (res: any) => {
            // console.log(res);
            this.masterBankform = false;
            this.GetConfirmAdd();
            this.onReset();
          },
          error: (error) => {
            // console.error('ini error: ', error);
            alert(error.error.message);
          }
        });
      };

      //edit data nasabah
      if (this.isEdit) {
        this.masterBankService.editNasabah(data).subscribe({
          next: (res: any) => {
            // console.log(res);
            this.masterBankform = false;
            this.GetConfirmEdit();
            this.onReset();
          },
          error: (error) => {
            // console.error('ini error: ', error);
            alert(error.error.message);
          }
        });
      };

      //delete nasabah
      if (this.isDelete) {
        this.masterBankService.deleteNasabah(this.form.controls['norek'].value).subscribe({
          next: (res: any) => {

            this.masterBankform = false;
            // this.GetConfirmDelete();
            this.cekErrorDel =false;
            this.berhasilDelete = true;
            this.onReset();

            // console.log(res);
          },
          error: (error) => {
            //this.gagalDelete = true;
            this.cekErrorDel = true;
            this.berhasilDelete = false;
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

  // onDelete(): void {
  //   this.submitted = false;
  //   this.masterBankform = false;
  //   this.GetConfirmDelete();
  // }

  onResetNew(): void {
    this.masterBankform = false;
    this.cekError = false;
    this.cekErrorDel = false;
    this.berhasilDelete = false;
    this.onReset()
  }

  deleteNasabah(){
    this.masterBankService.deleteNasabah(this.form.controls['norek'].value).subscribe({
      next: (res: any) => {
        this.masterBankform = false;
        this.berhasilDelete = true;
        this.onReset();

        // console.log(res);
      },
      error: (error) => {
        this.cekErrorDel = true;
        console.error('ini error: ', error);
      }
    });
  }

}
