import { Component, OnInit } from '@angular/core';
import { CountryService } from './country.service'
import { RegionService } from '../region-list/region.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { CountryInterface } from './country-interface'

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss'],
  providers: [ConfirmationService]
})
export class CountryListComponent implements OnInit {
  public cols: any = [];
  public countries: any = [];
  public listRegions: any = [];
  countryform: boolean = false;
  header: string = "";
  isEdit: boolean = false;
  isAdd: boolean = false;
  isDelete: boolean = false;
  

  showdelete(reference: CountryInterface) {
    this.isEdit = false;
    this.isAdd = false;
    this.isDelete = true;
    this.header = "Delete Country";
    this.form.disable();
    this.form.setValue(reference);
    this.countryform = true;
  }

  showAdd() {
    this.isEdit = false;
    this.isAdd = true;
    this.isDelete = false;
    this.header = "Add Country";
    this.form.enable();
    this.form.reset();
    this.countryform = true;
  }

  showEdit(reference: CountryInterface) {
    this.isEdit = true;
    this.isAdd = false;
    this.isDelete = false;
    this.header = "Edit Country";
    this.form.enable();
    this.form.controls['countryId'].disable();
    this.form.setValue(reference);
    this.countryform = true;
  }

  form: FormGroup = new FormGroup({
    countryId: new FormControl(''),
    countryName: new FormControl(''),
    regionId: new FormControl(0),
  });
  submitted = false;
  paramCountryId: number = 0;


  constructor(
    private countryService: CountryService,
    private regionService: RegionService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
  ) { }

  GetConfirmDelete() {
    this.confirmationService.confirm({
      message: 'Country with Country ID = ' + this.form.controls['countryId'].value + ' has been successfully deleted',
      header: 'Country Deleted',
    });
  }

  GetConfirmAdd() {
    this.confirmationService.confirm({
      message: 'Created country data with Country ID = '+this.form.controls['countryId'].value,
      header: 'Country Created',
    });
  }

  GetConfirmEdit() {
    this.confirmationService.confirm({
      message: 'Updated country data with Country ID = '+this.form.controls['countryId'].value,
      header: 'Country Updated',
    });
  }


  refreshPage() {
    this.countryService.findAll().subscribe({
      next: (res: any) => {
        this.countries = res;
        // console.log(res);
      },
      error: (error) => {
        console.error('ini error: ', error);
      }
    });

    this.regionService.findAll().subscribe({
      next: (res: any) => {
        this.listRegions = res;
        // console.log(res);
      },
      error: (error) => {
        console.error('ini error: ', error);
      }
    });
  }

  ngOnInit(): void {
    this.refreshPage();

    this.cols = [
      { field: 'countryId', header: 'Country ID' },
      { field: 'countryName', header: 'Country Name' },
      { field: 'regionId', header: 'Region ID' },
    ];
    this.form = this.formBuilder.group({
      countryId: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(50),
        ]
      ],
      countryName: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(50),
        ]
      ],
      regionId: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(50),
        ]
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
        this.form.controls['countryId'].enable();
      }
      let data = JSON.stringify(this.form.value);
      console.log(data);
      if (this.isEdit) {
        this.form.controls['countryId'].disable();
      }

      if (this.isAdd) {
        this.countryService.addCountry(data).subscribe({
          next: (res: any) => {
            console.log(res);
            this.countryform = false;
            this.GetConfirmAdd();
            this.onReset();
          },
          error: (error) => {
            console.error('ini error: ', error);
            alert(error.error.message);
          }
        });
      };

      if (this.isEdit) {
        this.countryService.editCountry(data).subscribe({
          next: (res: any) => {
            console.log(res);
            this.countryform = false;
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
        this.countryService.deleteCountry(this.form.controls['countryId'].value).subscribe({
          next: (res: any) => {
            this.onReset();
            this.countryform = false;
            this.countryform = false;
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
    this.submitted = false;
    if (this.isEdit) {
      this.form.controls['countryName'].reset();
      this.form.controls['regionId'].reset();
    } else {
      this.form.reset();
    }
    this.refreshPage();
  }

  onDelete(): void {
    this.submitted = false;
    this.countryform = false;
    this.GetConfirmDelete();
  }

}
