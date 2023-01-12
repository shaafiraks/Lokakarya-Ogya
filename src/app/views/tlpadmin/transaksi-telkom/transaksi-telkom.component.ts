import { Component, OnInit } from '@angular/core';
import {
  ConfirmationService,
  ConfirmEventType,
  LazyLoadEvent,
  MessageService,
} from 'primeng/api';
import { TransaksiTelkomInterface } from './transaksi-telkom-interface';
import { TransaksiTelkomService } from './transaksi-telkom.service';
import { MasterService } from '../master-pelanggan/master.service';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SearchRequest } from 'src/app/models/search.request.model';
import { SearchCriteria } from 'src/app/models/search.crtiteria.model';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-transaksi-telkom',
  templateUrl: './transaksi-telkom.component.html',
  styleUrls: ['./transaksi-telkom.component.scss'],
})
export class TransaksiTelkomComponent implements OnInit {
  public cols: any = [];
  public transaksi: any = [];
  public pelanggan: any = [];
  public totalTunggakan: any = 0;
  public totalData: any;
  public listIdPelanggan: any = [];
  transaksiform: boolean = false;
  header: string = '';
  isEdit: boolean = false;
  isAdd: boolean = false;
  isDelete: boolean = false;
  cekErrorAdd: boolean = false; //menampilkan error
  berhasilAdd: boolean = false; //menampilkan error
  public dateValue: Date | undefined;
  searchQuery: string = '';
  valIdPelanggan = '';
  public transaksiTelkom: any = [];
  loading: boolean = true;
  totalRows: number = 0;
  private isDirty: boolean = false;

  //menampilkan dialog delete
  showdelete(reference: TransaksiTelkomInterface) {
    this.form.setValue(reference);
    this.isEdit = false;
    this.isAdd = false;
    this.isDelete = true;
    this.getConfirmDelete();
    // this.header = 'Hapus Transaksi';
    this.form.disable();
    // this.transaksiform = true;
  }

  //menampilkan dialog add
  showAdd() {
    this.isEdit = false;
    this.isAdd = true;
    this.isDelete = false;
    this.header = 'Tambah Transaksi';
    this.form.reset();
    this.form.enable();
    this.transaksiform = true;
    this.form.controls['status'].setValue(1);
    this.form.controls['status'].disable();
  }

  //menampilkan dialog edit
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
    nama: new FormControl(''),
  });
  submitted = false;
  paramIdTransaksi: number = 0;

  constructor(
    private transaksiTelkomService: TransaksiTelkomService,
    private masterPelangganService: MasterService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  // menampilkan confirm dialog delete
  getConfirmDelete() {
    this.isEdit = false;
    this.isAdd = false;
    this.isDelete = true;
    this.confirmationService.confirm({
      message:
        'Are you sure want to delete Hak Akses with idTransaksi = ' +
        this.form.controls['idTransaksi'].value +
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
  getConfirmAdd() {
    this.confirmationService.confirm({
      message:
        'Berhasil menambahkan transaksi dengan ID Pelanggan:  ' +
        this.form.controls['idPelanggan'].value,
      header: 'Berhasil menambahkan transaksi',
    });
  }

  // menampilkan confirm dialog add
  getConfirmEdit() {
    this.confirmationService.confirm({
      message:
        'Berhasil memperbarui transaksi dengan ID = ' +
        this.form.controls['idTransaksi'].value,
      header: 'Transaksi diperbarui',
    });
  }

  // memanggil service findAll dan findAllUserId
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
        this.listIdPelanggan = res;
        // console.log(res);
      },
      error: (error) => {
        console.error('ini error: ', error);
      },
    });

    this.transaksiTelkomService.getTotal().subscribe({
      next: (res: any) => {
        this.totalTunggakan = res;

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
    searchReq._sortField = 'idTransaksi';
    searchReq._sortOrder = 'DESC';

    this.getTransaksiTelkomData(0, 5, searchReq);

    this.transaksiTelkomService.findAll().subscribe({
      next: (res: any) => {
        this.transaksi = res;
        // console.log(res);
      },
      error: (error) => {
        console.error('ini error: ', error);
      },
    });
  }

  getDownload() {
    this.transaksiTelkomService.download().subscribe({
      next: (data: any) => {
        saveAs(data, 'Transaksi.pdf');
      },
      error: (error) => {
        console.error('ini error', error);
      },
    });
  }

  ngOnInit(): void {
    // memanggil data findAll ketika komponen dibuka
    this.refreshPage();

    this.cols = [
      { field: 'idTransaksi', header: 'ID Transaksi' },
      { field: 'idPelanggan', header: 'ID Pelanggan' },
      { field: 'bulanTagihan', header: 'Bulan Tagihan' },
      { field: 'tahunTagihan', header: 'Tahun Tagihan' },
      { field: 'uang', header: 'Uang' },
      { field: 'status', header: 'Status' },
      { field: 'nama', header: 'Nama' },
    ];

    this.form = this.formBuilder.group({
      idPelanggan: [0, Validators.required],
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
      nama: [''],
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
            this.cekErrorAdd = false;
            this.getConfirmAdd();
            this.onReset();
            this.messageService.add({
              severity: 'success',
              summary: 'Tambah data berhasil',
              detail: 'Data transaksi telah ditambahkan',
            });
          },
          error: (error) => {
            this.cekErrorAdd = true;
            console.error('ini error: ', error);
            // alert(error.error.message);
          },
        });
      }
      if (this.isEdit) {
        this.transaksiTelkomService.editTransaksi(data).subscribe({
          next: (res: any) => {
            console.log(res);
            this.transaksiform = false;
            this.getConfirmEdit();
            this.onReset();
          },
          error: (error) => {
            console.error('ini error: ', error);
            alert(error.error.message);
          },
        });
      }

      if (this.isDelete) {
        this.transaksiTelkomService
          .deleteTransaksi(this.form.controls['idTransaksi'].value)
          .subscribe({
            next: (res: any) => {
              this.onReset();
              this.transaksiform = false;
              // console.log(res);
            },
            error: (error) => {
              console.error('ini error: ', error);
            },
          });
      }
    }
  }

  onReset(): void {
    this.submitted = false;
    if (this.isEdit) {
      let temp: number = this.form.controls['idTransaksi'].value;
      let temp1: number = this.form.controls['idPelanggan'].value;
      let temp2: number = this.form.controls['status'].value;
      this.form.reset();
      this.form.controls['idTransaksi'].setValue(temp);
      this.form.controls['idPelanggan'].setValue(temp1);
      this.form.controls['status'].setValue(temp2);
    } else {
      this.form.reset();
    }
    this.refreshPage();
  }

  onResetNew(): void {
    this.cekErrorAdd = false;
    this.onReset();
  }
  onDelete(): void {
    this.submitted = false;
    this.transaksiform = false;
    this.getConfirmDelete();
  }

  deleteMasterPelanggan() {
    this.masterPelangganService
      .deleteMasterPelanggan(this.form.controls['idTransaksi'].value)
      .subscribe({
        next: (res: any) => {
          this.transaksiform = false;
          this.berhasilAdd = true;
          this.onReset();

          // console.log(res);
        },
        error: (error) => {
          this.cekErrorAdd = true;
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
        event.sortField === null ? 'idTransaksi' : event.sortField;
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
        if (filterObj.hasOwnProperty('idTransaksi')) {
          fieldName = 'idTransaksi';
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

      this.getTransaksiTelkomData(currentPage, event.rows, searchReq);
    }
  }

  getTransaksiTelkomData(
    pageSize: number | undefined,
    pageNumber: number | undefined,
    search?: any
  ) {
    console.log(search);
    this.loading = true;
    this.transaksiTelkomService
      .getPage(pageSize, pageNumber, search)
      .subscribe({
        next: (res: any) => {
          this.transaksiTelkom = res.data;
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
