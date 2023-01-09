import { Component, OnInit } from '@angular/core';
import { HistoryTransaksiService } from './history-transaksi.service';
import { ConfirmationService } from 'primeng/api';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-history-transaksi',
  templateUrl: './history-transaksi.component.html',
  styleUrls: ['./history-transaksi.component.scss']
})
export class HistoryTransaksiComponent implements OnInit {

  constructor(
    private historyTransaksiService: HistoryTransaksiService,
    private formBuilder: FormBuilder,
  ) { }

  public cols: any = [];
  public historyTransaksi: any = [];
  public listMasterBank: any = [];
  historyTransaksiForm: boolean = false;
  header: string = "";

  form: FormGroup = new FormGroup({
    idHistoryBank: new FormControl(0),
    norek: new FormControl(0),
    nama: new FormControl(''),
    tanggal: new FormControl(''),
    uang: new FormControl(0),
    statusKet: new FormControl(0),
    noRekTujuan: new FormControl(0),
    noTlp: new FormControl(0),
  });

  refreshPage() {
    this.historyTransaksiService.findAll().subscribe({
      next: (res: any) => {
        this.historyTransaksi = res;
        // console.log(res);
      },
      error: (error) => {
        console.error('ini error: ', error);
      }
    });
  }

  ngOnInit(): void {
    this.refreshPage();

    this.form = this.formBuilder.group({
      idHistoryBank: [0,],
      norek: [0, Validators.required],
      nama: ['',],
      tanggal: ['', Validators.required],
      uang: [0,],
      statusKet: [0, Validators.required],
      noTlp: [0,],
      noRekTujuan: [0,],
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
  }

  onReset(): void {
  }

}
