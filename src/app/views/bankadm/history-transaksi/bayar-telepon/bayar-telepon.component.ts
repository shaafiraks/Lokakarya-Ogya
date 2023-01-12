import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { SearchCriteria } from 'src/app/models/search.crtiteria.model';
import { SearchRequest } from 'src/app/models/search.request.model';
import { HistoryTransaksiService } from '../history-transaksi.service';

@Component({
  selector: 'app-bayar-telepon',
  templateUrl: './bayar-telepon.component.html',
  styleUrls: ['./bayar-telepon.component.scss']
})
export class BayarTeleponComponent implements OnInit {

  // varibael-variabel untuk menampung data
  public bayarTeleponHistory: any = [];
  public bayarTeleponHariIni: any = [];
  public bayarTeleponPage: any = [];
  searchQuery: string = '';
  loading: boolean = true;
  totalRows: number = 0;
  private isDirty: boolean = false;

  constructor(private bayarTeleponService: HistoryTransaksiService) { }

  //get data dari service 
  getData() {

    let searchReq = new SearchRequest();
    searchReq._offSet = 0;
    searchReq._page = 0;
    searchReq._size = 5;
    searchReq._sortField = 'tanggal';
    searchReq._sortOrder = 'DESC';

    this.getBayarTeleponPaginations(0, 5, searchReq);

  //memanggil service find all data bayar telepon
    this.bayarTeleponService.findAllBayarTelepon().subscribe({
      next: (res: any) => {
        this.bayarTeleponHistory = res.data;
        console.log(res);
      },
      error: (error) => {
        console.error('ini error: ', error);
      }
    });

    this.bayarTeleponService.jumlahBayarTeleponHariIni().subscribe({
      next: (res: any) => {
        this.bayarTeleponHariIni = res;
        console.log(res);
      },
      error: (error) => {
        console.error('ini error: ', error);
      }
    });
  }

  ngOnInit(): void {
    this.getData();

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
        event.sortField === null ? 'tanggal' : event.sortField;
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
      }
  
      //console.log(JSON.stringify(searchReq));
  
      this.getBayarTeleponPaginations(currentPage, event.rows, searchReq);
    }
  }
  
  getBayarTeleponPaginations(
    pageSize: number | undefined,
    pageNumber: number | undefined,
    search?: any
  ) {
    console.log(search);
    this.loading = true;
    this.bayarTeleponService.getBayarTeleponPaginations(pageSize, pageNumber, search).subscribe({
      next: (res: any) => {
        this.bayarTeleponPage = res.data;
        this.loading = false;
        this.totalRows = res.totalRowCount;
        // console.log(res.data);
      },
      error: (error) => {
        console.error('ini error: ', error);
      },
    });
  }

  downloadDataBayarTelepon(): void {
    this.bayarTeleponService.downloadBayarTelepon().subscribe({
      next: (res) => {
        let binaryData = [];
        binaryData.push(res);
        var fileUrl = URL.createObjectURL(new Blob(binaryData, { type: 'application/pdf' }));
        window.open(fileUrl);
        // saveAs(res, 'Bayar Telepon History.pdf');
        console.log(res);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
