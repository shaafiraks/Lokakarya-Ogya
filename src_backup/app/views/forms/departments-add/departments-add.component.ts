import { Component, Input, OnInit, OnChanges } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentsService } from '../../../../app/services/departments.service';
import { LocationsService } from '../../../../app/services/locations.service';
import { EmployeesService } from '../../../../app/services/employees.service';

@Component({
  selector: 'app-departments-add',
  templateUrl: './departments-add.component.html',
  styleUrls: ['./departments-add.component.scss'],
})
export class DepartmentsAddComponent implements OnChanges {
  display: boolean = false;
  @Input() dataSelected: any = [];

  form: FormGroup = new FormGroup({
    departmentId: new FormControl(),
    departmentName: new FormControl(''),
    managerId: new FormControl(0),
    locationId: new FormControl(0),
  });
  submitted = false;
  jobList: any;
  departmentList: any = [];
  employeeList: any;
  locationList: any = [];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    // private jobService: JobService,
    private employeesService: EmployeesService,
    private departmentService: DepartmentsService,
    private locationsService: LocationsService
  ) {}

  ngOnChanges(): void {
    if (this.dataSelected) {
      console.log('selected-Child : ', this.dataSelected);
      this.display = true;
      this.form = this.formBuilder.group({
        // edit
        departmentId: [this.dataSelected && this.dataSelected.departmentId],
        // departmentId: [0, Validators.required],
        departmentName: [
          (this.dataSelected && this.dataSelected.departmentName) || '',
          Validators.required,
        ],
        managerId: [
          (this.dataSelected && this.dataSelected.managerId) || 0,
          Validators.required,
        ],
        locationId: [
          (this.dataSelected && this.dataSelected.locationId) || 0,
          Validators.required,
        ],
      });

      console.log(this.form, 'ini form');
      this.departmentService.getDepartments().subscribe({
        next: (resp: any) => {
          this.departmentList = resp.data;
        },
        error: (err: any) => {
          console.log(err);
        },
      });

      this.locationsService.getLocations().subscribe({
        next: (resp: any) => {
          this.locationList = resp.data;
        },
        error: (err: any) => {
          console.log(err);
        },
      });

      this.employeesService.getEmployees().subscribe({
        next: (resp: any) => {
          this.employeeList = resp.data;
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }


  onSave(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    } else {
      let data = JSON.stringify(this.form.value);
      if(this.form.value.departmentId){
        //ini run edit
        this.departmentService.editDepartment(data).subscribe({
          next: (resp: any) => {
            console.log(resp);
            if (resp.status) {
              this.onReset();
              this.router.navigate(['/forms/department']);
              console.log('berhasil insert');
            } else {
              alert('gagal insert data');
            }
          },
          error: (error) => {
            console.log(error);
          },
        });
      } else {
        // ini run post
        this.departmentService.addDepartment(data).subscribe({
          next: (resp: any) => {
            console.log(resp);
            if (resp.status) {
              this.onReset();
              // this.router.navigate(['/forms/department']);
              console.log('berhasil insert');
            } else {
              alert('gagal insert data');
            }
          },
          error: (error) => {
            console.log(error);
          },
        });
      }
    }
  }
  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    } else {
      let data = JSON.stringify(this.form.value);
      console.log(data);

      this.departmentService.addDepartment(data).subscribe({
        next: (resp: any) => {
          console.log(resp);
          if (resp.status) {
            this.onReset();
            this.router.navigate(['/forms/department']);
            console.log('berhasil insert');
          } else {
            alert('gagal insert data');
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  back() {
    this.router.navigate(['department'], { replaceUrl: true });
  }

  showDialog() {
    this.display = true;
  }
}
