import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { HakAksesService } from '../service/hak-akses.service';
import { RoleService } from '../service/role.service';
import { HakAksesInterface } from './hak-akses-interface';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, ConfirmEventType, LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { SearchCriteria } from 'src/app/models/search.crtiteria.model';
import { SearchRequest } from 'src/app/models/search.request.model';
import * as saveAs from 'file-saver';

@Component({
  selector: 'app-hak-akses',
  templateUrl: './hak-akses.component.html',
  styleUrls: ['./hak-akses.component.scss']
})
export class HakAksesComponent implements OnInit {

  //deklarasi variabel
  public hakAkses: any = [];
  public listUser: any = [];
  public listRole: any = [];
  multipleUser: any[] = [];
  aksesform: boolean = false;
  header: string = "";
  isEdit: boolean = false;
  isAdd: boolean = false;
  isDelete: boolean = false;
  now = new Date();
  submitted = false;
  username = localStorage.getItem('username');
  keteranganForm = '';
  valUserId = '';
  valRoleId = '';
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
    private userService: UserService,
    private hakAksesService: HakAksesService,
    private roleService: RoleService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) { }

  //Menampilkan form tambah data
  showAdd() {
    this.isEdit = false;
    this.isAdd = true;
    this.isDelete = false;
    this.header = "Add Hak Akses User";
    this.form.reset();
    this.form.enable();
    this.form.controls['createdBy'].setValue(this.username);
    this.form.controls['createdDate'].setValue(this.currentDate);
    this.aksesform = true;
    this.onReset();
  }

  //Menampilkan form edit data
  showEdit(reference: HakAksesInterface) {
    this.isEdit = true;
    this.isAdd = false;
    this.isDelete = false;
    this.header = "Edit Hak Akses User";
    this.form.enable();
    this.form.setValue(reference);
    this.form.controls['updatedBy'].setValue(this.username);
    this.form.controls['updatedDate'].setValue(this.currentDate);
    this.keteranganForm = 'Hak Akses ID : ' + reference.userId;
    this.aksesform = true;
  }

  //menampilkan confirm untuk delete data
  showDelete(reference: HakAksesInterface) {
    this.form.setValue(reference);
    this.isEdit = false;
    this.isAdd = false;
    this.isDelete = true;
    this.getConfirmDelete();
  }

  //Mendefinisikan formulir di Angular
  form: FormGroup = new FormGroup({
    hakAksesId: new FormControl(0),
    userId: new FormControl(0),
    roleId: new FormControl(0),
    programName: new FormControl(''),
    createdDate: new FormControl(''),
    createdBy: new FormControl(''),
    updatedDate: new FormControl(''),
    updatedBy: new FormControl(''),
    roleName: new FormControl(''),
    username: new FormControl(''),

  });

  //konfirmasi berhasil add ketika klik submit
  getConfirmAdd() {
    this.confirmationService.confirm({
      message:
        'Created Hak Akses data with User Id = ' + this.multipleUser,
      header: 'Hak Akses Created',
      accept: () => {
        this.onSubmit();
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Hak Akses Created',
        });
      },
    });
  }

  //konfirmasi berhasil edit ketika klik submit
  getConfirmEdit() {
    this.confirmationService.confirm({
      message:
        'Are you sure want to updated Hak Akses data with Hak Akses ID = ' +
        this.form.controls['hakAksesId'].value,
      header: 'Hak Akses Updated',
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
        'Are you sure want to delete Hak Akses with Hak Akses ID = ' +
        this.form.controls['hakAksesId'].value +
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

  errorMessage: string = '';
  cekError: boolean = false;
  //mengambil data dari service
  getData() {
    let searchReq = new SearchRequest();
    searchReq._offSet = 0;
    searchReq._page = 0;
    searchReq._size = 5;
    searchReq._sortField = 'createdDate';
    searchReq._sortOrder = 'DESC';

    this.gethakAksesData(0, 5, searchReq);

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

    this.roleService.get().subscribe({
      next: (res: any) => {
        this.listRole = res.data;
        // this.loading = false;
        // console.log(res);
      },
      error: (error) => {
        console.error('ini error: ', error);
      }
    });

  }

  getDownload(){
    this.hakAksesService.download().subscribe({
      next: (data) => {
        let binaryData = [];
        binaryData.push(data);
        var fileUrl = URL.createObjectURL(new Blob(binaryData, {type: 'application/pdf'}));
        window.open(fileUrl);
        console.log(data);
      },
      //  {
      //   saveAs(data, 'Hak Akses.pdf');
      // },
      error: (error) => {
        console.error('ini error', error);
      },
    });
  }

  ngOnInit(): void {
    this.getData();

    //menampilkan isi form add&edit
    this.form = this.formBuilder.group({
      hakAksesId: ['',],
      userId: ['', [Validators.required,],],
      roleId: ['', [Validators.required,],],
      programName: ['',],
      createdDate: ['',],
      createdBy: ['',],
      updatedDate: ['',],
      updatedBy: ['',],
      username: ['',],
      roleName: ['',],
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
      this.multipleUser = this.form.controls['userId'].value;
      for (let i = 0; i < this.multipleUser.length; i++) {
        this.form.controls['userId'].setValue(this.multipleUser[i]);
        console.log(this.form.value);
        let data = JSON.stringify(this.form.value);
        if (this.isAdd) {
          this.hakAksesService.add(data).subscribe({
                next: (res: any) => {
                  console.log(res);
                  this.aksesform = false;
                  // this.getConfirmAdd();
                  this.onReset();
                },
                error: (error) => {
                  this.form.reset();
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
      }
      this.form.controls['userId'].setValue(this.multipleUser);

      let data = JSON.stringify(this.form.value);
      console.log(data);

      if (this.isEdit) {
        this.hakAksesService.edit(data).subscribe({
          next: (res: any) => {
            console.log(res);
            this.aksesform = false;
            this.messageService.add({
              severity: 'info',
              summary: 'Confirmed',
              detail: 'Hak Akses Updated',
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
        this.hakAksesService.delete(this.form.controls['hakAksesId'].value).subscribe({
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
          }
        });
      }

    }
  }

  //button reset pada add data
  onReset(): void {
    this.submitted = false;
    if (this.isAdd) {
      let temp: number = this.form.controls['hakAksesId'].value;
      this.form.reset();
      this.form.controls['hakAksesId'].setValue(temp);
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
        event.sortField === null ? 'createdDate' : event.sortField;
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
        if (filterObj.hasOwnProperty('username')) {
          fieldName = 'username';
          if (filterObj['username'][0]['value'] == null) {
            if (typeof filterObj['global'] != 'undefined') {
              fieldValue = filterObj['global']['value'];
            } else {
              fieldValue = '';
            }
          } else {
            fieldValue = filterObj['username'][0]['value'];
          }

          let criteria = new SearchCriteria();
          criteria._name = fieldName;
          criteria._value = fieldValue;
          searchReq._filters.push(criteria);
        }
        if (filterObj.hasOwnProperty('roleName')) {
          fieldName = 'roleName';
          if (filterObj['roleName'][0]['value'] == null) {
            if (typeof filterObj['global'] != 'undefined') {
              fieldValue = filterObj['global']['value'];
            } else {
              fieldValue = '';
            }
          } else {
            fieldValue = filterObj['roleName'][0]['value'];
          }
          let criteria = new SearchCriteria();
          criteria._name = fieldName;
          criteria._value = fieldValue;
          searchReq._filters.push(criteria);
        }
      }

      //console.log(JSON.stringify(searchReq));

      this.gethakAksesData(currentPage, event.rows, searchReq);
    }
  }

  gethakAksesData(
    pageSize: number | undefined,
    pageNumber: number | undefined,
    search?: any
  ) {
    console.log(search);
    this.loading = true;
    this.hakAksesService.getPage(pageSize, pageNumber, search).subscribe({
      next: (res: any) => {
        this.hakAkses = res.data;
        this.loading = false;
        this.totalRows = res.totalRowCount;
        // console.log(res.data);
      },
      error: (error) => {
        console.error('ini error: ', error);
      },
    });
  }

}
