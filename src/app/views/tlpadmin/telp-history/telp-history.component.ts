import { Component, OnInit } from '@angular/core';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { TelpHistoryInterface } from './telp-history-interface';
import { TelpHistoryService } from './telp-history.service';
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
  selector: 'app-telp-history',
  templateUrl: './telp-history.component.html',
  styleUrls: ['./telp-history.component.scss'],
})
export class TelpHistoryComponent implements OnInit {
  public cols: any = [];
  public telpHistory: any = [];
  public totalTagihan: any = 0;
  public pelanggan: any = [];
  telpHistoryForm: boolean = false;
  header: string = '';
  isEdit: boolean = false;
  isAdd: boolean = false;
  isDelete: boolean = false;
  searchQuery: string = '';
  public historyTelkom: any = [];
  loading: boolean = true;
  totalRows: number = 0;
  private isDirty: boolean = false;

  showdelete(reference: TelpHistoryInterface) {
    this.form.setValue(reference);
    this.isEdit = false;
    this.isAdd = false;
    this.isDelete = true;
    this.header = 'Delete History';
    this.form.disable();
    this.telpHistoryForm = true;
  }

  showAdd() {
    this.isEdit = false;
    this.isAdd = true;
    this.isDelete = false;
    this.header = 'Add History';
    this.form.reset();
    this.form.enable();
    this.telpHistoryForm = true;
  }

  showEdit(reference: TelpHistoryInterface) {
    this.isEdit = true;
    this.isAdd = false;
    this.isDelete = false;
    this.header = 'Edit History';
    this.form.enable();
    this.form.controls['idHistory'].disable();
    this.form.setValue(reference);
    this.telpHistoryForm = true;
  }

  form: FormGroup = new FormGroup({
    idHistory: new FormControl(0),
    idPelanggan: new FormControl(0),
    tanggalBayar: new FormControl(Date),
    bulanTagihan: new FormControl(0),
    tahunTagihan: new FormControl(0),
    uang: new FormControl(0),
  });
  submitted = false;
  paramIdTelpHistory: number = 0;

  constructor(
    private telpHistoryService: TelpHistoryService,
    private masterPelangganService: MasterService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService
  ) {}

  GetConfirmDelete() {
    this.confirmationService.confirm({
      message:
        'Pelanggan dengan ID: ' +
        this.form.controls['idHistory'].value +
        ' telah berhasil dihapus',
      header: 'Pelanggan dihapus',
    });
  }

  getConfirmAdd() {
    this.confirmationService.confirm({
      message:
        'Berhasil menambahkan history dengan ID:  ' +
        this.form.controls['idHistory'].value,
      header: 'Berhasil menambahkan history',
    });
  }

  getConfirmEdit() {
    this.confirmationService.confirm({
      message:
        'Berhasil memperbarui pelanggan dengan ID = ' +
        this.form.controls['idHistory'].value,
      header: 'Pelanggan diperbarui',
    });
  }

  refreshPage() {
    this.telpHistoryService.findAll().subscribe({
      next: (res: any) => {
        this.telpHistory = res;
        // console.log(res);
      },
      error: (error) => {
        console.error('ini error: ', error);
      },
    });

    this.masterPelangganService.findAll().subscribe({
      next: (res: any) => {
        this.pelanggan = res;
        // console.log(res);
      },
      error: (error) => {
        console.error('ini error: ', error);
      },
    });
    this.telpHistoryService.getNominal().subscribe({
      next: (res: any) => {
        this.totalTagihan = res;
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
    searchReq._sortField = 'idHistory';
    searchReq._sortOrder = 'DESC';

    this.getHistoryTelkomData(0, 5, searchReq);

    this.telpHistoryService.findAll().subscribe({
      next: (res: any) => {
        this.telpHistory = res;
        // console.log(res);
      },
      error: (error) => {
        console.error('ini error: ', error);
      },
    });
  }

  getTotalNominal() {
    this.telpHistoryService.getNominal().subscribe({
      next: (res: any) => {
        this.totalTagihan = res;
        console.log(this.totalTagihan);
      },
      error: (error) => {
        console.error('ini error: ', error);
      },
    });
  }

  getDownload() {
    this.telpHistoryService.download().subscribe({
      next: (data: any) => {
        saveAs(data, 'Laporan Pelunasan.pdf');
      },
      error: (error) => {
        console.error('ini error', error);
      },
    });
  }

  ngOnInit(): void {
    this.refreshPage();

    this.cols = [
      { field: 'idHistory', header: 'ID History' },
      { field: 'idPelanggan', header: 'ID Pelanggan' },
      { field: 'tanggalBayar', header: 'Tanggal Bayar' },
      { field: 'bulanTagihan', header: 'Bulan Tagihan' },
      { field: 'tahunTagihan', header: 'Tahun Tagihan' },
      { field: 'uang', header: 'Uang' },
    ];

    this.form = this.formBuilder.group({
      idHistory: ['', [Validators.required, Validators.maxLength(4)]],
      idPelanggan: [
        '',
        [Validators.required, Validators.minLength(1), Validators.maxLength(9)],
      ],
      tanggalBayar: ['', [Validators.required]],
      bulanTagihan: [
        '',
        [Validators.required, Validators.minLength(1), Validators.maxLength(2)],
      ],
      tahunTagihan: [
        '',
        [Validators.required, Validators.minLength(1), Validators.maxLength(4)],
      ],
      uang: ['', [Validators.required, Validators.maxLength(8)]],
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
      if (this.isEdit) {
        this.form.controls['idHistory'].enable();
      }
      let data = JSON.stringify(this.form.value);
      console.log(data);
      if (this.isEdit) {
        this.form.controls['idHistory'].disable();
      }

      if (this.isAdd) {
        this.telpHistoryService.addTelpHistory(data).subscribe({
          next: (res: any) => {
            console.log(res);
            this.telpHistoryForm = false;
            this.getConfirmAdd();
            this.onReset();
          },
          error: (error) => {
            console.error('ini error: ', error);
            alert(error.error.message);
          },
        });
      }

      if (this.isEdit) {
        this.telpHistoryService.editTelpHistory(data).subscribe({
          next: (res: any) => {
            console.log(res);
            this.telpHistoryForm = false;
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
        this.telpHistoryService
          .deleteTelpHistory(this.form.controls['idPelanggan'].value)
          .subscribe({
            next: (res: any) => {
              this.onReset();
              this.telpHistoryForm = false;
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
    // this.submitted = false;

    // this.form.reset();

    // this.refreshPage();

    this.submitted = false;
    if (this.isEdit) {
      let temp: number = this.form.controls['idPelanggan'].value;
      this.form.reset();
      this.form.controls['idPelanggan'].setValue(temp);
    } else {
      this.form.reset();
    }
    this.refreshPage();
  }

  onDelete(): void {
    this.submitted = false;
    this.telpHistoryForm = false;
    this.GetConfirmDelete();
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
        event.sortField === null ? 'idHistory' : event.sortField;
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
        if (filterObj.hasOwnProperty('idHistory')) {
          fieldName = 'idHistory';
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

      this.getHistoryTelkomData(currentPage, event.rows, searchReq);
    }
  }

  getHistoryTelkomData(
    pageSize: number | undefined,
    pageNumber: number | undefined,
    search?: any
  ) {
    console.log(search);
    this.loading = true;
    this.telpHistoryService.getPage(pageSize, pageNumber, search).subscribe({
      next: (res: any) => {
        this.historyTelkom = res.data;
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
