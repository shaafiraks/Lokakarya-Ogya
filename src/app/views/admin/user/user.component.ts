import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService } from '../service/user.service';
import { UserInterface } from './user-interface';
import {
  ConfirmationService,
  ConfirmEventType,
  LazyLoadEvent,
  MessageService,
} from 'primeng/api';
import { Table } from 'primeng/table';
import { SearchRequest } from 'src/app/models/search.request.model';
import { SearchCriteria } from 'src/app/models/search.crtiteria.model';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  //deklarasi variabel
  public users: any[] = [];
  public listUser: any = [];
  currentPage: number = 0;
  userform: boolean = false;
  header: string = '';
  isEdit: boolean = false;
  isAdd: boolean = false;
  isDelete: boolean = false;
  now = new Date();
  submitted = false;
  username = localStorage.getItem('username');
  sameUsername: number = 0;
  sameEmail: number = 0;
  currentUsername: string = '';
  currentEmail: string = '';
  keteranganForm = '';
  password = '';
  valUsername = '';
  valPassword = '';
  valNama = '';
  valAlamat = '';
  valEmail = '';
  valTelp = '';
  valProgramName = '';
  searchQuery: string = '';
  loading: boolean = true;
  currentDate = `${this.now.getFullYear()}-${this.padTo2Digits(
    this.now.getMonth() + 1
  )}-${this.padTo2Digits(this.now.getDate())}`;

  totalRows: number = 0;
  private isDirty: boolean = false;

  //format tanggal angka 2 digit
  padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }

  //Mask Password
  maskPassword(password: string): string {
    return '*'.repeat(password.length);
  }

  //Menampilkan form tambah data
  showAdd() {
    this.isEdit = false;
    this.isAdd = true;
    this.isDelete = false;
    this.header = 'Add Users';
    this.form.reset();
    this.form.enable();
    this.form.controls['createdBy'].setValue(this.username);
    this.form.controls['createdDate'].setValue(this.currentDate);
    this.userform = true;
    this.onReset();
  }

  //Menampilkan form edit data
  showEdit(reference: UserInterface) {
    console.log(this.currentPage);
    this.isEdit = true;
    this.isAdd = false;
    this.isDelete = false;
    this.header = 'Edit Users';
    this.form.enable();
    reference.sameUsername = 0;
    reference.sameEmail = 0;
    reference.password = 'passwordwkwk';
    this.form.setValue(reference);
    this.form.controls['updatedBy'].setValue(this.username);
    this.form.controls['updatedDate'].setValue(this.currentDate);
    this.currentUsername = reference.username;
    this.currentEmail = reference.email;
    this.keteranganForm =
      'User ID (' + reference.userId + ') : ' + reference.nama;
    this.userform = true;
  }

  //menampilkan confirm untuk delete data
  showDelete(reference: UserInterface) {
    reference.sameUsername = 0;
    reference.sameEmail = 0;
    reference.password = 'passwordwkwk';
    this.form.setValue(reference);
    this.isEdit = false;
    this.isAdd = false;
    this.isDelete = true;
    this.getConfirmDelete();
  }

  //Mendefinisikan formulir di Angular
  form: FormGroup = new FormGroup({
    userId: new FormControl(0),
    username: new FormControl(''),
    password: new FormControl(''),
    nama: new FormControl(''),
    alamat: new FormControl(''),
    email: new FormControl(''),
    telp: new FormControl(''),
    programName: new FormControl(''),
    createdDate: new FormControl(''),
    createdBy: new FormControl(''),
    updatedDate: new FormControl(''),
    updatedBy: new FormControl(''),
    sameUsername: new FormControl(0),
    sameEmail: new FormControl(0),
  });

  //konfirmasi berhasil add ketika klik submit
  getConfirmAdd() {
    this.confirmationService.confirm({
      message:
        'Created users data with Username = ' +
        this.form.controls['username'].value,
      header: 'Users Created',
      accept: () => {
        this.onSubmit();
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Users Created',
        });
      },
    });
  }

  //konfirmasi berhasil edit ketika klik submit
  getConfirmEdit() {
    this.confirmationService.confirm({
      message:
        'Are you sure want to updated User with Username = ' +
        this.form.controls['username'].value,
      header: 'Confirm Updated',
      accept: () => {
        this.onSubmit();
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

  //konfirmasi berhasil delete ketika klik submit
  getConfirmDelete() {
    this.isEdit = false;
    this.isAdd = false;
    this.isDelete = true;
    this.confirmationService.confirm({
      message:
        'Are you sure want to delete User with Username = ' +
        this.form.controls['username'].value +
        '?',
      header: 'Confirm Delete',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.onSubmit();
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
    let searchReq = new SearchRequest();
    searchReq._offSet = 0;
    searchReq._page = 0;
    searchReq._size = 5;
    searchReq._sortField = 'userId';
    searchReq._sortOrder = 'DESC';
    searchReq._filters = [];

    this.getUserData(searchReq);

    this.userService.get().subscribe({
      next: (res: any) => {
        this.listUser = res.data;
        // this.loading = false;
        // console.log(res);
      },
      error: (error) => {
        console.error('ini error: ', error);
      },
    });
  }

  ngOnInit(): void {
    this.getData();

    //menampilkan isi form add&edit
    this.form = this.formBuilder.group({
      userId: [''],
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
        ],
      ],
      password: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      nama: ['', [Validators.required]],
      alamat: [''],
      telp: ['', [Validators.required]],
      programName: [''],
      createdDate: [''],
      createdBy: [''],
      updatedDate: [''],
      updatedBy: [''],
      sameUsername: [''],
      sameEmail: [''],
    });
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
      if (this.isEdit) {
        if (this.form.controls['username'].value == this.currentUsername) {
          this.form.controls['sameUsername'].setValue(1);
        } else {
          this.form.controls['sameUsername'].setValue(0);
        }

        if (this.form.controls['email'].value == this.currentEmail) {
          this.form.controls['sameEmail'].setValue(1);
        } else {
          this.form.controls['sameEmail'].setValue(0);
        }
      }
      if (this.isEdit || this.isDelete) {
        this.form.controls['password'].disable();
        console.log('sampe gak sih');
      }
      let data = JSON.stringify(this.form.value);
      console.log(data);

      if (this.isAdd) {
        this.userService.add(data).subscribe({
          next: (res: any) => {
            console.log(res);
            this.userform = false;
            this.getConfirmAdd();
            this.onReset();
          },
          error: (error) => {
            console.error('ini error: ', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error Message',
              detail: error.error.message,
            });
            // alert(error.error.message);
          },
        });
      }

      if (this.isEdit) {
        this.userService.edit(data).subscribe({
          next: (res: any) => {
            console.log(res);
            this.userform = false;
            this.messageService.add({
              severity: 'info',
              summary: 'Confirmed',
              detail: 'Users Updated',
            });
            // this.getConfirmEdit();
            this.onReset();
          },
          error: (error) => {
            console.error('ini error: ', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error Message',
              detail: error.error.message,
            });
            // alert(error.error.message);
          },
        });
      }

      if (this.isDelete) {
        this.userService.delete(this.form.controls['userId'].value).subscribe({
          next: (res: any) => {
            this.messageService.add({
              severity: 'info',
              summary: 'Confirmed',
              detail: 'Record deleted',
            });
            this.onReset();
          },
          error: (error) => {
            console.error('ini error: ', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error Message',
              detail: error.error.message,
            });
            // alert(error.error.message);
          },
        });
      }
    }
  }

  //button reset pada add data
  onReset(): void {
    this.submitted = false;
    if (this.isAdd) {
      let temp: number = this.form.controls['userId'].value;
      this.form.reset();
      this.form.controls['userId'].setValue(temp);
      this.form.controls['createdBy'].setValue(this.username);
      this.form.controls['createdDate'].setValue(this.currentDate);
    } else {
      this.form.reset();
    }
    this.getData();
  }

  clear(table: Table) {
    table.clear();
  }

  nextPage(event: LazyLoadEvent) {
    console.log(event.filters);
    if (this.isDirty) {
      alert('You have unsaved changes!!!');
      console.log(event);
    } else {
      let searchReq = new SearchRequest();
      searchReq._offSet = event.first;
      searchReq._page = event.first;
      searchReq._size = event.rows;
      searchReq._sortField =
        event.sortField === undefined ? 'userId' : event.sortField;
      searchReq._sortOrder = event.sortOrder === 1 ? 'ASC' : 'DESC';
      searchReq._filters = [];

      let currentPage = event.first;
      if (event.first !== undefined && event.rows !== undefined) {
        searchReq._page = Math.ceil(event.first / event.rows);
        currentPage = Math.ceil(event.first / event.rows);
      }

      //Process filter object
      let filterObj = <any>event.filters;
      console.log('filter by : ', filterObj);
      let fieldName: string = '';
      let fieldValue = [];

      if (filterObj !== undefined) {
        if (filterObj.hasOwnProperty('username')) {
          fieldName = 'username';

          if (
            typeof filterObj['global'] != 'undefined' ||
            filterObj['username'][0]['value'] !== null
          ) {
            if (filterObj['username'][0]['value'] == null) {
              if (typeof filterObj['global'] != 'undefined') {
                fieldValue.push(filterObj['global']['value']);
              } else {
                fieldValue = [];
              }
            } else {
              fieldValue = filterObj['username'][0]['value'];
            }

            let criteria = new SearchCriteria();
            criteria._name = fieldName;
            criteria._value = fieldValue;
            searchReq._filters.push(criteria);
          }
        }
        // if (filterObj.hasOwnProperty('createdBy')) {
        //   fieldName = 'createdBy';
        //   if (filterObj['createdBy'][0]['value'] == null) {
        //     if (typeof filterObj['global'] != 'undefined') {
        //       fieldValue = filterObj['global']['value'];
        //     } else {
        //       fieldValue = '';
        //     }
        //   } else {
        //     fieldValue = filterObj['createdBy'][0]['value'];
        //   }
        //   let criteria = new SearchCriteria();
        //   criteria._name = fieldName;
        //   criteria._value = fieldValue;
        //   searchReq._filters.push(criteria);
        // }
      }

      //console.log(JSON.stringify(searchReq));

      this.getUserData(searchReq);
    }
  }

  getUserData(search?: any) {
    console.log(search);
    this.loading = true;
    this.userService.post(search).subscribe({
      next: (res: any) => {
        this.users = res.data;
        this.loading = false;
        this.totalRows = res.totalRowCount;
        // console.log(res.data);
      },
      error: (error) => {
        console.error('ini error: ', error);
      },
    });
  }

  // file: any;

  downloadData(): void {
    this.userService.getFilePdf().subscribe({
      next: (resp) => {
        let binaryData = [];
        binaryData.push(resp);
        var fileUrl = URL.createObjectURL(
          new Blob(binaryData, { type: 'application/pdf' })
        );
        window.open(fileUrl);
        // saveAs(resp, 'Data-User.pdf');
        console.log(resp);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
