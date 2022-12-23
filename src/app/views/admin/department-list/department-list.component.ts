import { Component, OnInit } from '@angular/core';
import { DepartmentService } from './department.service'
import { LocationService } from '../location-list/location.service';
import { DepartmentInterface } from './department-interface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss']
})
export class DepartmentListComponent implements OnInit {
  public cols: any = [];
  public departments: any = [];
  public locationsList: any = [];
  departmentform: boolean = false;
  header: string = "";
  isEdit: boolean = false;
  isAdd: boolean = false;
  isDelete: boolean = false;
  

  showdelete(reference: DepartmentInterface) {
    this.isEdit = false;
    this.isAdd = false;
    this.isDelete = true;
    this.header = "Delete Department";
    this.form.disable();
    this.form.setValue(reference);
    this.departmentform = true;
  }

  showAdd() {
    this.isEdit = false;
    this.isAdd = true;
    this.isDelete = false;
    this.header = "Add Country";
    this.form.enable();
    this.form.reset();
    this.departmentform = true;
  }

  showEdit(reference: DepartmentInterface) {
    this.isEdit = true;
    this.isAdd = false;
    this.isDelete = false;
    this.header = "Edit Country";
    this.form.enable();
    this.form.controls['countryId'].disable();
    this.form.setValue(reference);
    this.departmentform = true;
  }

  form: FormGroup = new FormGroup({
    departmentId: new FormControl(0),
    departmentName: new FormControl(''),
    managerId: new FormControl(0),
    locationId: new FormControl(0),
  });
  submitted = false;
  paramDepartmentId: number = 0;
  
  constructor(
    private departmentService: DepartmentService,
    private locationService: LocationService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    // private router: Router
  ) { }

  GetConfirmDelete() {
    this.confirmationService.confirm({
      message: 'Department with Department ID = ' + this.form.controls['departmentId'].value + ' has been successfully deleted',
      header: 'Department Deleted',
    });
  }

  GetConfirmAdd() {
    this.confirmationService.confirm({
      message: 'Created Department data with Department ID = '+this.form.controls['departmentName'].value,
      header: 'Department Created',
    });
  }

  GetConfirmEdit() {
    this.confirmationService.confirm({
      message: 'Updated department data with Department ID = '+this.form.controls['departmentId'].value,
      header: 'Department Updated',
    });
  }

  refreshPage() {
    this.departmentService.findAll().subscribe({
      next: (res: any) => {
        this.departments = res;
        // console.log(res);
      },
      error: (error) => {
        console.error('ini error: ', error);
      }
    });

    this.locationService.findAll().subscribe({
      next: (res: any) => {
        this.locationsList = res;
        // console.log(res);
      },
      error: (error) => {
        console.error('ini error: ', error);
      }
    });
  }

  ngOnInit(): void {
    this.refreshPage();

    
    this.departmentService.findAll().subscribe({
      next: (res: any) => {
        this.departments = res;
        // console.log(res);
      },
      error: (error) => {
        console.error('ini error: ', error);
      }
    });
    this.cols = [
      { field: 'departmentId', header: 'Department ID' },
      { field: 'departmentName', header: 'Department Name' },
      { field: 'managerId', header: 'Manager ID' },
      { field: 'locationId', header: 'Location ID' }
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

  add() {
    // this.router.navigate(["employee-add"], { replaceUrl: true });
  }

  edit(employeeId: number): void{
    // this.router.navigate(['employee-add', employeeId]);
  }


}
