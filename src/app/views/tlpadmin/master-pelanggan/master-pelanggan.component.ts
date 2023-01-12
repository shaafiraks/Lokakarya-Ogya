import { CurrencyPipe } from '@angular/common';
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
import { SearchCriteria } from 'src/app/models/search.crtiteria.model';
import { SearchRequest } from 'src/app/models/search.request.model';
import { MasterPelangganInterface } from './master-pelanggan-interface';
import { MasterService } from './master.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-master-pelanggan',
  templateUrl: './master-pelanggan.component.html',
  styleUrls: ['./master-pelanggan.component.scss'],
  providers: [CurrencyPipe],
})
export class MasterPelangganComponent implements OnInit {
  public cols: any = [];
  public pelanggan: MasterPelangganInterface[] = [];
  public users: any = [];
  public selectedUser: any = [];
  masterform: boolean = false;
  header: string = '';
  isEdit: boolean = false;
  isAdd: boolean = false;
  isDelete: boolean = false;
  element: any = [];
  cekError: boolean = false; //menampilkan error
  cekErrorDel: boolean = false; //menampilkan error
  errorMessage: string = '';
  berhasilDelete: boolean = false; //menampilkan error
  gagalDelete: boolean = false;
  public masterPelanggan: any = [];
  searchQuery: string = '';
  loading: boolean = true;
  totalRows: number = 0;
  private isDirty: boolean = false;

  getElement(item: any) {
    // this.element = item;
    //this.form.setValue;
    console.log(this.element);
  }

  //menampilkan dialog delete
  showdelete(reference: MasterPelangganInterface) {
    this.form.setValue(reference);
    this.isEdit = false;
    this.isAdd = false;
    this.isDelete = true;
    this.getConfirmDelete();
    // this.header = 'Hapus Pelanggan';
    this.form.disable();
    // this.masterform = true;
  }

  //menampilkan dialog add
  showAdd() {
    this.isEdit = false;
    this.isAdd = true;
    this.isDelete = false;
    this.header = 'Tambah Pelanggan';
    this.form.reset();
    this.form.enable();
    this.form.controls['nama'].disable();
    this.form.controls['noTelp'].disable();
    this.form.controls['alamat'].disable();
    this.masterform = true;
  }

  //menampilkan dialog edit
  showEdit(reference: MasterPelangganInterface) {
    this.isEdit = true;
    this.isAdd = false;
    this.isDelete = false;
    this.header = 'Edit Pelanggan';
    this.form.enable();
    this.form.controls['idPelanggan'].disable();
    this.form.setValue(reference);
    this.masterform = true;
  }

  form: FormGroup = new FormGroup({
    idPelanggan: new FormControl(0),
    nama: new FormControl(''),
    noTelp: new FormControl(''),
    alamat: new FormControl(''),
    userId: new FormControl(0),
  });
  submitted = false;
  paramIdPelanggan: number = 0;

  constructor(
    private masterPelangganService: MasterService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  // untuk auto input berdasarkan dropdown
  changeSelect(event: any) {
    // console.log(event.target.value);
    // console.log(this.users);
    // memanggil service findUserById untuk kebutuhan add pelanggan
    this.masterPelangganService.findUserById(event.target.value).subscribe({
      next: (res: any) => {
        this.selectedUser = res.data[0];
        this.form.controls['nama'].setValue(this.selectedUser.nama);
        this.form.controls['alamat'].setValue(this.selectedUser.alamat);
        this.form.controls['noTelp'].setValue(this.selectedUser.telp);
      },
      error: (error) => {
        console.error('ini error: ', error);
      },
    });
  }

  getConfirmDelete() {
    this.isEdit = false;
    this.isAdd = false;
    this.isDelete = true;
    this.confirmationService.confirm({
      message:
        'Are you sure want to delete Hak Akses with idTransaksi = ' +
        this.form.controls['idPelanggan'].value +
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

  // menampilkan confirm dialog add
  GetConfirmAdd() {
    this.confirmationService.confirm({
      message:
        'Berhasil menambahkan pelanggan dengan nama  ' +
        this.form.controls['nama'].value,
      header: 'Berhasil menambahkan',
    });
  }

  // menampilkan confirm dialog edit
  GetConfirmEdit() {
    this.confirmationService.confirm({
      message:
        'Berhasil memperbarui pelanggan dengan ID ' +
        this.form.controls['idPelanggan'].value,
      header: 'Pelanggan diperbarui',
    });
  }

  // memanggil service findAll dan findAllUserId
  refreshPage() {
    this.masterPelangganService.findAll().subscribe({
      next: (res: any) => {
        this.pelanggan = res;
        // console.log(res);
      },
      error: (error) => {
        console.error('ini error: ', error);
      },
    });

    this.masterPelangganService.findAllUserId().subscribe({
      next: (res: any) => {
        this.users = res;
        // console.log(res);
      },
      error: (error) => {
        console.error('ini error: ', error);
      },
    });
  }

  getData() {
    // untung paging
    let searchReq = new SearchRequest();
    searchReq._offSet = 0;
    searchReq._page = 0;
    searchReq._size = 5;
    searchReq._sortField = 'idPelanggan';
    searchReq._sortOrder = 'DESC';

    this.getMasterPelangganData(0, 5, searchReq);

    this.masterPelangganService.findAll().subscribe({
      next: (res: any) => {
        this.pelanggan = res;
        // console.log(res);
      },
      error: (error) => {
        console.error('ini error: ', error);
      },
    });
  }

  getDownload() {
    this.masterPelangganService.download().subscribe({
      next: (data: any) => {
        saveAs(data, 'Master Pelanggan.pdf');
      },
      error: (error) => {
        console.error('ini error', error);
      },
    });
  }

  ngOnInit(): void {
    console.log(this.pelanggan);
    // memanggil data findAll ketika komponen dibuka
    this.refreshPage();

    this.cols = [
      { field: 'idPelanggan', header: 'ID Pelanggan' },
      { field: 'nama', header: 'Nama' },
      { field: 'noTelp', header: 'Nomor Telepon' },
      { field: 'alamat', header: 'Alamat' },
      { field: 'userId', header: 'User ID' },
    ];
    this.form = this.formBuilder.group({
      idPelanggan: [0],
      nama: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(50),
        ],
      ],
      noTelp: ['', [Validators.required, Validators.maxLength(13)]],
      alamat: ['', [Validators.required, Validators.maxLength(50)]],
      userId: [0, Validators.required],
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
      if (this.isAdd) {
        this.form.controls['nama'].enable();
        this.form.controls['noTelp'].enable();
        this.form.controls['alamat'].enable();
      }
      if (this.isEdit) {
        this.form.controls['idPelanggan'].enable();
      }
      let data = JSON.stringify(this.form.value);
      console.log(data);
      if (this.isAdd) {
        this.form.controls['nama'].disable();
        this.form.controls['noTelp'].disable();
        this.form.controls['alamat'].disable();
      }
      if (this.isEdit) {
        this.form.controls['idPelanggan'].disable();
      }

      if (this.isAdd) {
        this.masterPelangganService.addMasterPelanggan(data).subscribe({
          next: (res: any) => {
            console.log(res);
            this.masterform = false;
            this.GetConfirmAdd();
            this.onReset();
          },
          error: (error) => {
            this.cekError = true;
            this.errorMessage = error.error.message;
            console.error('ini error: ', error);
            // alert(error.error.message);
          },
        });
      }

      if (this.isEdit) {
        this.masterPelangganService.editPelanggan(data).subscribe({
          next: (res: any) => {
            console.log(res);
            this.masterform = false;
            this.GetConfirmEdit();
            this.onReset();
          },
          error: (error) => {
            console.error('ini error: ', error);
            this.errorMessage = error.error.message;
            // alert(error.error.message);
          },
        });
      }

      if (this.isDelete) {
        this.masterPelangganService
          .deleteMasterPelanggan(this.form.controls['idPelanggan'].value)
          .subscribe({
            next: (res: any) => {
              this.masterform = false;
              // this.GetConfirmDelete();
              this.cekErrorDel = false;
              this.berhasilDelete = true;
              this.onReset();

              // console.log(res);
            },
            error: (error) => {
              //this.gagalDelete = true;
              this.cekErrorDel = true;
              this.berhasilDelete = false;
              this.errorMessage = error.error.message;
              console.error('ini error: ', error);
            },
          });
      }
    }
  }

  onReset(): void {
    this.submitted = false;
    if (this.isEdit) {
      let temp: number = this.form.controls['idPelanggan'].value;
      this.form.reset();
      // this.form.controls['idPelanggan'].reset();
      this.form.controls['idPelanggan'].setValue(temp);
    } else {
      this.form.reset();
    }
    this.refreshPage();
  }

  // onDelete(): void {
  //   this.submitted = false;
  //   this.masterform = false;
  //   this.GetConfirmDelete();
  // }

  onResetNew(): void {
    this.masterform = false;
    this.cekError = false;
    this.cekErrorDel = false;
    this.berhasilDelete = false;
    this.onReset();
  }

  deleteMasterPelanggan() {
    this.masterPelangganService
      .deleteMasterPelanggan(this.form.controls['idPelanggan'].value)
      .subscribe({
        next: (res: any) => {
          this.masterform = false;
          this.berhasilDelete = true;
          this.onReset();

          // console.log(res);
        },
        error: (error) => {
          this.cekErrorDel = true;
          console.error('ini error: ', error);
        },
      });
  }

  // untuk paging

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
        event.sortField === null ? 'idPelanggan' : event.sortField;
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
        if (filterObj.hasOwnProperty('idPelanggan')) {
          fieldName = 'idPelanggan';
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
      }

      //console.log(JSON.stringify(searchReq));

      this.getMasterPelangganData(currentPage, event.rows, searchReq);
    }
  }

  getMasterPelangganData(
    pageSize: number | undefined,
    pageNumber: number | undefined,
    search?: any
  ) {
    console.log(search);
    this.loading = true;
    this.masterPelangganService
      .getPage(pageSize, pageNumber, search)
      .subscribe({
        next: (res: any) => {
          this.masterPelanggan = res.data;
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
