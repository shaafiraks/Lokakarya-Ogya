import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { TelpHistoryInterface } from './telp-history-interface'
import { TelpHistoryService } from './telp-history.service'
import { MasterService } from '../master-pelanggan/master.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-telp-history',
  templateUrl: './telp-history.component.html',
  styleUrls: ['./telp-history.component.scss']
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
  searchQuery: string='';

  showdelete(reference: TelpHistoryInterface) {
    this.form.setValue(reference);
    this.isEdit = false;
    this.isAdd = false;
    this.isDelete = true;
    this.header = "Delete History";
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
    this.header = "Edit History";
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
  ) { }

  GetConfirmDelete() {
    this.confirmationService.confirm({
      message: 'Pelanggan dengan ID: ' + this.form.controls['idHistory'].value + ' telah berhasil dihapus',
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
      message: 'Berhasil memperbarui pelanggan dengan ID = ' + this.form.controls['idHistory'].value,
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
      }
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
      idPelanggan: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(9)]],
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
          }
        });
      };

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
          }
        });
      };

      if (this.isDelete) {
        this.telpHistoryService.deleteTelpHistory(this.form.controls['idPelanggan'].value).subscribe({
          next: (res: any) => {
            this.onReset();
            this.telpHistoryForm = false;
            // console.log(res);
          },
          error: (error) => {
            console.error('ini error: ', error);
          }
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

}
