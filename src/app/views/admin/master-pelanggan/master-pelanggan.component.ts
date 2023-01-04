import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { MasterPelangganInterface } from './master-pelanggan-interface'
import { MasterPelangganService} from './master.service'

@Component({
  selector: 'app-master-pelanggan',
  templateUrl: './master-pelanggan.component.html',
  styleUrls: ['./master-pelanggan.component.scss'],
  providers: [ConfirmationService]
})
export class MasterPelangganComponent implements OnInit {
  

  public cols: any= [];
  public pelanggan: MasterPelangganInterface[] = [];
  public users: any = [];
  masterform: boolean = false;
  header: string = '';
  isEdit: boolean = false;
  isAdd: boolean = false;
  isDelete: boolean = false;
  element: any =[];
  cekError: boolean = false; //menampilkan error
  cekErrorDel: boolean = false; //menampilkan error
  berhasilDelete: boolean = false; //menampilkan error
  gagalDelete : boolean = false;
  public masterPelanggan: any = [];

  getElement(item : any){
      // this.element = item;
      //this.form.setValue;
      console.log(this.element);
      
  }
  showdelete(reference: MasterPelangganInterface) {
    this.form.setValue(reference);
    this.isEdit = false;
    this.isAdd = false;
    this.isDelete = true;
    this.header = "Delete Pelanggan";
    this.form.disable();
    this.masterform = true;
  }

  showAdd() {
    this.isEdit = false;
    this.isAdd = true;
    this.isDelete = false;
    this.header = "Add Pelanggan";
    this.form.reset();
    this.form.enable();
    // this.form.controls['nama'].disable();
    // this.form.controls['noTelp'].disable();
    // this.form.controls['alamat'].disable();
    this.masterform = true;
  }

  showEdit(reference: MasterPelangganInterface) {
    this.isEdit = true;
    this.isAdd = false;
    this.isDelete = false;
    this.header = "Edit Pelanggan";
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
  })
  submitted = false;
  paramIdPelanggan: number = 0;

  constructor(
    private masterPelangganService: MasterPelangganService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
  ) { }


  // untuk auto input berdasarkan dropdown
  changeSelect(event:any) {
    // console.log(e.target.value);
    // console.log(this.users);
        this.form.controls['nama'].setValue(this.users[event.target.value-1].nama);
        this.form.controls['alamat'].setValue(this.users[event.target.value-1].alamat);
        this.form.controls['noTelp'].setValue(this.users[event.target.value-1].telp);
  }
    

  
  // GetConfirmDelete() {
  //   this.confirmationService.confirm({
  //     message: 'Pelanggan dengan ID ' + this.form.controls['idPelanggan'].value + ' telah berhasil dihapus',
  //     header: 'Pelanggan dihapus',
  //   });
  // }

  GetConfirmAdd() {
    this.confirmationService.confirm({
      message: 'Berhasil menambahkan pelanggan dengan nama  '+this.form.controls['nama'].value,
      header: 'Berhasil menambahkan',
    });
  }

  GetConfirmEdit() {
    this.confirmationService.confirm({
      message: 'Berhasil memperbarui pelanggan dengan ID '+this.form.controls['idPelanggan'].value,
      header: 'Pelanggan diperbarui',
    });
  }

  refreshPage() {
    this.masterPelangganService.findAll().subscribe({
      next: (res: any) => {
        this.pelanggan = res;
        // console.log(res);
      },
      error: (error) => {
        console.error('ini error: ', error);
      }
    });

    this.masterPelangganService.findAllUserId().subscribe({
      next: (res: any) => {
        this.users = res;
        // console.log(res);
      },
      error: (error) => {
        console.error('ini error: ', error);
      }
    });

  }

  getData(){
    this.masterPelangganService.findAll().subscribe({
      next: (res: any) => {
        this.pelanggan = res;
        // console.log(res);
      },
      error: (error) => {
        console.error('ini error: ', error);
      }
    });
  }

  ngOnInit(): void {
    console.log(this.pelanggan);
    this.refreshPage();

    this.cols = [
      { field: 'idPelanggan', header: 'ID Pelanggan' },
      { field: 'nama', header: 'Nama' },
      { field: 'noTelp', header: 'Nomor Telepon' },
      { field: 'alamat', header: 'Alamat' },
      { field: 'userId', header: 'User ID' },
      
  ];
    this.form = this.formBuilder.group({
      idPelanggan: [
        0,
      ],
      nama: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(50),
        ]
      ],
      noTelp: [
        '',
        [
          Validators.required,
          Validators.maxLength(13),
        ]
      ],
      alamat: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
        ]
      ],
      userId: [
        0,
      ],
    })
   
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
        this.form.controls['idPelanggan'].enable();
      }
      let data = JSON.stringify(this.form.value);
      console.log(data);
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
            console.error('ini error: ', error);
            // alert(error.error.message);
          }
        });
      };

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
            alert(error.error.message);
          }
        });
      };

      if (this.isDelete) {
        this.masterPelangganService.deleteMasterPelanggan(this.form.controls['idPelanggan'].value).subscribe({
          next: (res: any) => {
            
            this.masterform = false;
            // this.GetConfirmDelete();
            this.berhasilDelete = true;
            this.onReset();
            
            // console.log(res);
          },
          error: (error) => {
            //this.gagalDelete = true;
            this.cekErrorDel = true;
            console.error('ini error: ', error);
          }
        });
      }
    }
  }

  onReset(): void {
    this.submitted = false;
    if (this.isEdit) {
      let temp : number = this.form.controls['idPelanggan'].value;
      this.form.reset();
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
    this.onReset()
  }

}
