import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { JobService } from '../job-list/job.service';
import { DepartmentService } from '../department-list/department.service';
import { EmployeeService } from './employee.service'
import { ConfirmationService } from 'primeng/api';
import { EmployeeInterface } from './employee-interface'

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  providers: [ConfirmationService]
})
export class EmployeeListComponent implements OnInit {
  public cols: any = [];
  public employees: any = [];
  public listJobs: any = [];
  public listDepartments: any = [];
  employeeform: boolean = false;
  header: string = "";
  isEdit: boolean = false;
  isAdd: boolean = false;
  isDelete: boolean = false;

  showdelete(reference: EmployeeInterface) {
    this.form.setValue(reference);
    this.isEdit = false;
    this.isAdd = false;
    this.isDelete = true;
    this.header = "Delete Country";
    this.form.disable();
    this.employeeform = true;
  }

  showAdd() {
    this.isEdit = false;
    this.isAdd = true;
    this.isDelete = false;
    this.header = "Add Employee";
    this.form.reset();
    this.form.enable();
    this.employeeform = true;
  }

  showEdit(reference: EmployeeInterface) {
    this.isEdit = true;
    this.isAdd = false;
    this.isDelete = false;
    this.header = "Edit Employee";
    this.form.enable();
    this.form.controls['employeeId'].disable();
    this.form.setValue(reference);
    this.employeeform = true;
  }


  form: FormGroup = new FormGroup({
    employeeId: new FormControl(0),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    phoneNumber: new FormControl(''),
    hireDate: new FormControl(''),
    jobId: new FormControl(''),
    salary: new FormControl(0),
    commissionPct: new FormControl(0),
    managerId: new FormControl(0),
    departmentId: new FormControl(0),
  });
  submitted = false;
  paramEmployeeId: number = 0;

  constructor(
    private employeeService: EmployeeService,
    private jobService: JobService,
    private departmentService: DepartmentService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
  ) { }

  GetConfirmDelete() {
    this.confirmationService.confirm({
      message: 'Employee with Employee ID = ' + this.form.controls['employeeId'].value + ' has been successfully deleted',
      header: 'Employee Deleted',
    });
  }

  GetConfirmAdd() {
    this.confirmationService.confirm({
      message: 'Created employee data with Employee First Name = '+this.form.controls['firstName'].value,
      header: 'Employee Created',
    });
  }

  GetConfirmEdit() {
    this.confirmationService.confirm({
      message: 'Updated employee data with Employee ID = '+this.form.controls['employeeId'].value,
      header: 'Employee Updated',
    });
  }

  refreshPage() {
    this.employeeService.findAll().subscribe({
      next: (res: any) => {
        this.employees = res;
        // console.log(res);
      },
      error: (error) => {
        console.error('ini error: ', error);
      }
    });

    this.jobService.findAll().subscribe({
      next: (res: any) => {
        this.listJobs = res;
        // console.log(res);
      },
      error: (error) => {
        console.error('ini error: ', error);
      }
    });

    this.departmentService.findAll().subscribe({
      next: (res: any) => {
        this.listDepartments = res;
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
      { field: 'employeeId', header: 'Employee ID' },
      { field: 'firstName', header: 'First Name' },
      { field: 'lastName', header: 'Last Name' },
      { field: 'email', header: 'Email' },
      { field: 'phoneNumber', header: 'Phone Number' },
      { field: 'hireDate', header: 'Hire Date' },
      { field: 'jobId', header: 'Job ID' },
      { field: 'salary', header: 'Salary' },
      { field: 'commissionPct', header: 'Commission PCT' },
      { field: 'managerId', header: 'Manager ID' },
      { field: 'departmentId', header: 'Department ID' },
      
  ];
    this.form = this.formBuilder.group({
      employeeId: [
        '',
      ],
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(50),
        ]
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(50),
        ]
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],
      phoneNumber: ['',],
      hireDate: ['', Validators.required,],
      salary: ['',],
      commissionPct: ['',],
      departmentId: ['', Validators.required,],
      departmentName: ['',],
      jobId: ['', Validators.required,],
      jobTitle: ['',],
      managerId: [
        '',
        [
          Validators.required, 
        ]
      ],
      managerFirstName: ['',
      ],
      managerLastName: [
        '',
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
        this.form.controls['employeeId'].enable();
      }
      let data = JSON.stringify(this.form.value);
      console.log(data);
      if (this.isEdit) {
        this.form.controls['employeeId'].disable();
      }

      if (this.isAdd) {
        this.employeeService.addEmployee(data).subscribe({
          next: (res: any) => {
            console.log(res);
            this.employeeform = false;
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
        this.employeeService.editEmployee(data).subscribe({
          next: (res: any) => {
            console.log(res);
            this.employeeform = false;
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
        this.employeeService.deleteEmployee(this.form.controls['employeeId'].value).subscribe({
          next: (res: any) => {
            this.onReset();
            this.employeeform = false;
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
      let temp : number = this.form.controls['employeeId'].value;
      this.form.reset();
      this.form.controls['employeeId'].setValue(temp);
    } else {
      this.form.reset();
    }
    this.refreshPage();
  }

  onDelete(): void {
    this.submitted = false;
    this.employeeform = false;
    this.GetConfirmDelete();
  }


}
