import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { MenuService } from '../service/menu.service';
import { MenuInterface } from './menu-interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  //deklarasi variabel
  public cols: any = [];
  public menu: any = [];
  menuform: boolean = false;
  header: string = "";
  isEdit: boolean = false;
  isAdd: boolean = false;
  isDelete: boolean = false;
  now = new Date();
  submitted = false;
  username = localStorage.getItem('username');
  keteranganForm = '';
  valNama = '';
  valIcon = '';
  valUrl = '';
  valProgramName = '';
  currentDate = `${this.now.getFullYear()}-${this.padTo2Digits(this.now.getMonth() + 1)}-${this.padTo2Digits(this.now.getDate())}`;

  //format tanggal angka 2 digit
  padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }

  constructor(
    private menuService: MenuService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) { }

  //menampilkan confirm untuk delete data
  showDelete(reference: MenuInterface) {
    this.form.setValue(reference);
    this.isEdit = false;
    this.isAdd = false;
    this.isDelete = true;
    this.getConfirmDelete();
  }

  //Menampilkan form tambah data
  showAdd() {
    this.isEdit = false;
    this.isAdd = true;
    this.isDelete = false;
    this.header = "Add Menu";
    this.form.reset();
    this.form.enable();
    this.form.controls['createdBy'].setValue(this.username);
    this.form.controls['createdDate'].setValue(this.currentDate);
    this.menuform = true;
    this.onReset();
  }

  //Menampilkan form edit data
  showEdit(reference: MenuInterface) {
    this.isEdit = true;
    this.isAdd = false;
    this.isDelete = false;
    this.header = "Edit Menu";
    this.form.enable();
    this.form.setValue(reference);
    this.form.controls['updatedBy'].setValue(this.username);
    this.form.controls['updatedDate'].setValue(this.currentDate);
    this.keteranganForm = 'Menu ID (' + reference.menuId + ') : ' + reference.nama;
    this.menuform = true;
  }

  //Mendefinisikan formulir di Angular
  form: FormGroup = new FormGroup({
    menuId: new FormControl(0),
    nama: new FormControl(''),
    icon: new FormControl(''),
    url: new FormControl(''),
    programName: new FormControl(''),
    createdDate: new FormControl(''),
    createdBy: new FormControl(''),
    updatedDate: new FormControl(''),
    updatedBy: new FormControl(''),

  });

  //konfirmasi berhasil add ketika klik submit
  GetConfirmAdd() {
    this.confirmationService.confirm({
      message:
        'Created Menu data with Name = ' +
        this.form.controls['nama'].value,
      header: 'Menu Created',
      accept: () => {
        this.onSubmit();
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Menu Created',
        });
      },
    });
  }

  //konfirmasi berhasil edit ketika klik submit
  GetConfirmEdit() {
    this.confirmationService.confirm({
      message:
        'Updated Menu data with Menu ID = ' +
        this.form.controls['menuId'].value,
      header: 'Menu Updated',
      accept: () => {
        this.onSubmit();
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Menu Updated',
        });
      },
    });
  }

  //konfirmasi berhasil delete ketika klik submit
  getConfirmDelete() {
    this.isEdit = false;
    this.isAdd = false;
    this.isDelete = true;
    this.confirmationService.confirm({
      message:
        'Are you sure want to delete Menu with Menu ID = ' +
        this.form.controls['menuId'].value +
        '?',
      header: 'Confirm Delete',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.onSubmit();
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Record deleted',
        });
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'error',
              summary: 'Rejected',
              detail: 'You have rejected',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'Cancelled',
              detail: 'You have cancelled',
            });
            break;
        }
      },
    });
  }

  //mengambil data dari service
  getData() {
    this.menuService.get().subscribe({
      next: (res: any) => {
        this.menu = res;
        // console.log(res);
      },
      error: (error) => {
        console.error('ini error: ', error);
      }
    });

  }

  ngOnInit(): void {
    this.getData();

    //menampilkan isi form add&edit
    this.form = this.formBuilder.group({
      menuId: ['',],
      nama: ['', [Validators.required,]],
      icon: ['', [Validators.required,]],
      url: ['', [Validators.required,]],
      programName: ['',],
      createdDate: ['',],
      createdBy: ['',],
      updatedDate: ['',],
      updatedBy: ['',],

    })

  }

  //inisialisasi ts untuk dipanggil di html
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  //submit pada add edit delete
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

      if (this.isAdd) {
        this.menuService.add(data).subscribe({
          next: (res: any) => {
            console.log(res);
            this.menuform = false;
            this.GetConfirmAdd();
            this.onReset();
          },
          error: (error) => {
            console.error('ini error: ', error);
            alert(error.error.message);
          }
        });
      };

      if (this.isEdit) {
        this.menuService.edit(data).subscribe({
          next: (res: any) => {
            console.log(res);
            this.menuform = false;
            this.GetConfirmEdit();
            this.onReset();
          },
          error: (error) => {
            console.error('ini error: ', error);
            alert(error.error.message);
          }
        });
      };

      if (this.isDelete) {
        this.menuService.delete(this.form.controls['menuId'].value).subscribe({
          next: (res: any) => {
            this.onReset();
          },
          error: (error) => {
            console.error('ini error: ', error);
          }
        });
      }

    }
  }

  //button reset pada add data
  onReset(): void {
    this.submitted = false;
    if (this.isAdd) {
      let temp: number = this.form.controls['menuId'].value;
      this.form.reset();
      this.form.controls['menuId'].setValue(temp);
      this.form.controls['createdBy'].setValue(this.username);
      this.form.controls['createdDate'].setValue(this.currentDate);
    } else {
      this.form.reset();
    }
    this.getData();
  }

}
