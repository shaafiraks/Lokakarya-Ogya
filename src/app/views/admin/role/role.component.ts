import { Component, OnInit } from '@angular/core';
import { RoleInterface } from './role-interface';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, ConfirmEventType, LazyLoadEvent, MessageService } from 'primeng/api';
import { RoleService } from '../service/role.service';
import { Table } from 'primeng/table';
import { UserService } from '../service/user.service';
import { SearchCriteria } from 'src/app/models/search.crtiteria.model';
import { SearchRequest } from 'src/app/models/search.request.model';
import * as saveAs from 'file-saver';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

  //deklarasi variabel
  public cols: any = [];
  public listUser: any[] = [];
  public role: any = [];
  roleform: boolean = false;
  header: string = "";
  isEdit: boolean = false;
  isAdd: boolean = false;
  isDelete: boolean = false;
  now = new Date();
  submitted = false;
  username = localStorage.getItem('username');
  keteranganForm = '';
  valNama = '';
  valProgramName = '';
  searchQuery: string = '';
  loading: boolean = true;
  currentDate = `${this.now.getFullYear()}-${this.padTo2Digits(this.now.getMonth() + 1)}-${this.padTo2Digits(this.now.getDate())}`;

  totalRows: number = 0;
  private isDirty: boolean = false;

  //format tanggal angka 2 digit
  padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }

  constructor(
    private roleService: RoleService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private userService: UserService,

  ) { }

  //menampilkan confirm untuk delete data
  showDelete(reference: RoleInterface) {
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
    this.header = "Add Role";
    this.form.reset();
    this.form.enable();
    this.form.controls['createdBy'].setValue(this.username);
    this.form.controls['createdDate'].setValue(this.currentDate);
    this.roleform = true;
    this.onReset();
  }

  //Menampilkan form edit data
  showEdit(reference: RoleInterface) {
    this.isEdit = true;
    this.isAdd = false;
    this.isDelete = false;
    this.header = "Edit Role";
    this.form.enable();
    this.form.setValue(reference);
    this.form.controls['updatedBy'].setValue(this.username);
    this.form.controls['updatedDate'].setValue(this.currentDate);
    this.keteranganForm = 'Role ID (' + reference.roleId + ') : ' + reference.nama;
    this.roleform = true;
  }

  //Mendefinisikan formulir di Angular
  form: FormGroup = new FormGroup({
    roleId: new FormControl(0),
    nama: new FormControl(''),
    programName: new FormControl(''),
    createdDate: new FormControl(''),
    createdBy: new FormControl(''),
    updatedDate: new FormControl(''),
    updatedBy: new FormControl(''),

  });

  //konfirmasi berhasil add ketika klik submit
  getConfirmAdd() {
    this.confirmationService.confirm({
      message: 'Created Role data with Name = ' + this.form.controls['nama'].value,
      header: 'Role Created',
      accept: () => {
        this.onSubmit();
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Role Created',
        });
      },
    });
  }

  //konfirmasi berhasil edit ketika klik submit
  getConfirmEdit() {
    this.confirmationService.confirm({
      message: 'Are you sure want to updated Role data with Name = ' + this.form.controls['nama'].value,
      header: 'Role Updated',
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
        'Are you sure want to delete Role with Name = ' +
        this.form.controls['nama'].value +
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
    searchReq._sortField = 'createdDate';
    searchReq._sortOrder = 'DESC';
    searchReq._filters = []

    this.getRoleData(searchReq);

    this.userService.get().subscribe({
      next: (res: any) => {
        this.listUser = res.data;
        // this.loading = false;
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
      roleId: ['',],
      nama: ['', [Validators.required,],],
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
        this.roleService.add(data).subscribe({
          next: (res: any) => {
            console.log(res);
            this.roleform = false;
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
          }
        });
      };

      if (this.isEdit) {
        this.roleService.edit(data).subscribe({
          next: (res: any) => {
            console.log(res);
            this.roleform = false;
            this.messageService.add({
              severity: 'info',
              summary: 'Confirmed',
              detail: 'Role Updated',
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
          }
        });
      };

      if (this.isDelete) {
        this.roleService.delete(this.form.controls['roleId'].value).subscribe({
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
          }
        });
      }

    }
  }

  //button reset pada add data
  onReset(): void {
    this.submitted = false;
    if (this.isAdd) {
      let temp: number = this.form.controls['roleId'].value;
      this.form.reset();
      this.form.controls['roleId'].setValue(temp);
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
        event.sortField === undefined ? 'roleId' : event.sortField;
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
      let fieldValue: string = '';

      if (filterObj !== undefined) {
        if (filterObj.hasOwnProperty('nama')) {
          fieldName = 'nama';
          if (filterObj['nama'][0]['value'] == null) {
            if (typeof filterObj['global'] != 'undefined') {
              fieldValue = filterObj['global']['value'];
            } else {
              fieldValue = '';
            }
          } else {
            fieldValue = filterObj['nama'][0]['value'];
          }

          let criteria = new SearchCriteria();
          criteria._name = fieldName;
          criteria._value = fieldValue;
          searchReq._filters.push(criteria);
        }
        // if (filterObj.hasOwnProperty('roleId')) {
        //   fieldName = 'roleId';
        //   if (filterObj['roleId'][0]['value'] == null) {
        //     if (typeof filterObj['global'] != 'undefined') {
        //       fieldValue = filterObj['global']['value'];
        //     } else {
        //       fieldValue = '';
        //     }
        //   } else {
        //     fieldValue = filterObj['roleId'][0]['value'];
        //   }
        //   let criteria = new SearchCriteria();
        //   criteria._name = fieldName;
        //   criteria._value = fieldValue;
        //   searchReq._filters.push(criteria);
        // }
      }

      //console.log(JSON.stringify(searchReq));

      this.getRoleData(searchReq);
    }
  }

  getRoleData(
    search?: any
  ) {
    console.log(search);
    this.loading = true;
    this.roleService.post(search).subscribe({
      next: (res: any) => {
        this.role = res.data;
        this.loading = false;
        this.totalRows = res.totalRowCount;
        // console.log(res.data);
      },
      error: (error) => {
        console.error('ini error: ', error);
      },
    });
  }

  downloadData(): void {
    this.roleService.getFilePdf().subscribe({
      next: (resp) => {
        let binaryData = [];
        binaryData.push(resp);
        var fileUrl = URL.createObjectURL(new Blob(binaryData, { type: 'application/pdf' }));
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
