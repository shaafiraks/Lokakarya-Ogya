import { SearchRequest } from './../../../models/search.request.model';
import { SearchCriteria } from './../../../models/search.crtiteria.model';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  ConfirmationService,
  ConfirmEventType,
  LazyLoadEvent,
  MessageService,
} from 'primeng/api';

import { RoleService } from '../service/role.service';
import { RoleMenuService } from '../service/role-menu.service';
import { MenuService } from '../service/menu.service';
import { RoleMenuInterface } from './role-menu-interface';
import { Table } from 'primeng/table';
import { UserService } from '../service/user.service';
import { PaginatorInterface } from '../pagination-interface';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-role-menu',
  templateUrl: './role-menu.component.html',
  styleUrls: ['./role-menu.component.scss'],
})
export class RoleMenuComponent implements OnInit {
  //deklarasi variabel
  public role: any = [];
  public roleMenu: any = [];
  public listRole: any = [];
  public listUser: any = [];
  public listMenu: any = [];
  download: any = [];
  multipleMenu: any[] = [];
  roleMenuform: boolean = false;
  header: string = '';
  isEdit: boolean = false;
  isAdd: boolean = false;
  isDelete: boolean = false;
  currentPage: any = [];
  now = new Date();
  submitted = false;
  username = localStorage.getItem('username');
  keteranganForm = '';
  valNama = '';
  valRoleId = '';
  valMenuId: string = '';
  valProgramName = '';
  valIsActive = '';
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

  constructor(
    private roleService: RoleService,
    private menuService: MenuService,
    private roleMenuService: RoleMenuService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private userService: UserService
  ) {}

  //menampilkan confirm untuk delete data
  showDelete(reference: RoleMenuInterface) {
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
    this.header = 'Add Role Menu';
    this.form.reset();
    this.form.enable();
    this.form.controls['createdBy'].setValue(this.username);
    this.form.controls['createdDate'].setValue(this.currentDate);
    this.roleMenuform = true;
    this.onReset();
  }

  //Menampilkan form edit data
  showEdit(reference: RoleMenuInterface) {
    this.isEdit = true;
    this.isAdd = false;
    this.isDelete = false;
    this.header = 'Edit Role Menu';
    this.form.enable();
    this.form.setValue(reference);
    this.form.controls['updatedBy'].setValue(this.username);
    this.form.controls['updatedDate'].setValue(this.currentDate);
    this.keteranganForm = 'Role Menu ID : ' + reference.roleMenuId;
    this.roleMenuform = true;
  }

  //Mendefinisikan formulir di Angular
  form: FormGroup = new FormGroup({
    roleMenuId: new FormControl(0),
    roleId: new FormControl(0),
    menuId: new FormControl(0),
    isActive: new FormControl(''),
    programName: new FormControl(''),
    createdDate: new FormControl(''),
    createdBy: new FormControl(''),
    updatedDate: new FormControl(''),
    updatedBy: new FormControl(''),
    roleName: new FormControl(''),
    menuName: new FormControl(''),
  });

  //konfirmasi berhasil add ketika klik submit
  getConfirmAdd() {
    this.confirmationService.confirm({
      message: 'Created Role Menu data with Role ID = ' + this.multipleMenu,
      header: 'Role Menu Created',
      accept: () => {
        this.onSubmit();
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Role Menu Created',
        });
      },
    });
  }

  //konfirmasi berhasil edit ketika klik submit
  getConfirmEdit() {
    this.confirmationService.confirm({
      message:
        'Are you sure want to updated Role Menu data with Role Menu ID = ' +
        this.form.controls['roleMenuId'].value,
      header: 'Role Menu Updated',
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
        'Are you sure want to delete Role Menu with Role Menu ID = ' +
        this.form.controls['roleMenuId'].value +
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

    this.getRoleMenuData(0, 5, searchReq);

    this.roleService.get().subscribe({
      next: (res: any) => {
        this.listRole = res.data;
        // this.loading = false;
        // console.log(res);
      },
      error: (error) => {
        console.error('ini error: ', error);
      },
    });

    this.menuService.get().subscribe({
      next: (res: any) => {
        this.listMenu = res.data;
        // this.loading = false;
        // console.log(res);
      },
      error: (error) => {
        console.error('ini error: ', error);
      },
    });

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

  // getDownload() {
  //   this.roleMenuService.download().subscribe({
  //     next: (data: any) => {
  //       saveAs(data, 'Role Menu.pdf');
  //     },
  //     error: (error) => {
  //       console.error('ini error', error);
  //     },
  //   });
  // }

  getDownload(): void {
    this.roleMenuService.download().subscribe({
      next: (data) => {
        let binaryData = [];
        binaryData.push(data);
        var fileUrl = URL.createObjectURL(new Blob(binaryData, { type: 'application/pdf' }));
        window.open(fileUrl);
        // saveAs(resp, 'Data-User.pdf');
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  ngOnInit(): void {
    this.getData();

    //menampilkan isi form add&edit
    this.form = this.formBuilder.group({
      roleMenuId: [''],
      roleId: ['', [Validators.required]],
      menuId: ['', [Validators.required]],
      isActive: ['', [Validators.required]],
      programName: [''],
      createdDate: [''],
      createdBy: [''],
      updatedDate: [''],
      updatedBy: [''],
      roleName: [''],
      menuName: [''],
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

      this.multipleMenu = this.form.controls['menuId'].value;
      for (let i = 0; i < this.multipleMenu.length; i++) {
        this.form.controls['menuId'].setValue(this.multipleMenu[i]);
        let data = JSON.stringify(this.form.value);
        if (this.isAdd) {
          this.roleMenuService.add(data).subscribe({
            next: (res: any) => {
              console.log(res);
              this.roleMenuform = false;
              this.getConfirmAdd();
              this.onReset();
            },
            error: (error) => {
              // this.onReset();
              this.form.reset();
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
      this.form.controls['menuId'].setValue(this.multipleMenu);

      let data = JSON.stringify(this.form.value);
      console.log(data);

      // if (this.isAdd) {
      //   this.roleMenuService.add(data).subscribe({
      //     next: (res: any) => {
      //       console.log(res);
      //       this.roleMenuform = false;
      //       this.getConfirmAdd();
      //       this.onReset();
      //     },
      //     error: (error) => {
      //       console.error('ini error: ', error);
      //       this.messageService.add({
      //         severity: 'error',
      //         summary: 'Error Message',
      //         detail: error.error.message,
      //       });
      //       // alert(error.error.message);
      //     }
      //   });
      // };

      if (this.isEdit) {
        this.roleMenuService.edit(data).subscribe({
          next: (res: any) => {
            console.log(res);
            this.roleMenuform = false;
            this.messageService.add({
              severity: 'info',
              summary: 'Confirmed',
              detail: 'Role Menu Updated',
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
        this.roleMenuService
          .delete(this.form.controls['roleMenuId'].value)
          .subscribe({
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
            },
          });
      }
    }
  }

  onReset(): void {
    this.submitted = false;
    if (this.isAdd) {
      let temp: number = this.form.controls['roleMenuId'].value;
      this.form.reset();
      this.form.controls['roleMenuId'].setValue(temp);
      this.form.controls['createdBy'].setValue(this.username);
      this.form.controls['createdDate'].setValue(this.currentDate);
    } else {
      this.form.reset();
    }
    this.getData();
  }

  clear(table: Table) {
    this.searchQuery = '';
    table.reset();
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
        if (filterObj.hasOwnProperty('menuId')) {
          fieldName = 'menuId';
          if (filterObj['menuId'][0]['value'] == null) {
            if (typeof filterObj['global'] != 'undefined') {
              fieldValue = filterObj['global']['value'];
            } else {
              fieldValue = '';
            }
          } else {
            fieldValue = filterObj['menuId'][0]['value'];
          }

          let criteria = new SearchCriteria();
          criteria._name = fieldName;
          criteria._value = fieldValue;
          searchReq._filters.push(criteria);
        }
        if (filterObj.hasOwnProperty('roleId')) {
          fieldName = 'roleId';
          if (filterObj['roleId'][0]['value'] == null) {
            if (typeof filterObj['global'] != 'undefined') {
              fieldValue = filterObj['global']['value'];
            } else {
              fieldValue = '';
            }
          } else {
            fieldValue = filterObj['roleId'][0]['value'];
          }
          let criteria = new SearchCriteria();
          criteria._name = fieldName;
          criteria._value = fieldValue;
          searchReq._filters.push(criteria);
        }
      }

      //console.log(JSON.stringify(searchReq));

      this.getRoleMenuData(currentPage, event.rows, searchReq);
    }
  }

  getRoleMenuData(
    pageSize: number | undefined,
    pageNumber: number | undefined,
    search?: any
  ) {
    console.log(search);
    this.loading = true;
    this.roleMenuService.getPage(pageSize, pageNumber, search).subscribe({
      next: (res: any) => {
        this.roleMenu = res.data;
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
