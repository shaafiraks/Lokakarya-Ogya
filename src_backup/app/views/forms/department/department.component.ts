import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {DepartmentsService} from '../../../../app/services/departments.service'

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
  public departments : any = [];
  display: boolean = false;
  addDepartment: boolean = false;
  dataSelected:any = null;
  deleteDepartment: boolean = false;
  editDepartment:boolean = false;


  showAddDepartment(){
    this.addDepartment = true;
  }

  showDeleteDepartment(){
    this.deleteDepartment = true;
  }

  showEditDepartment(data:any){
    this.editDepartment=true;
    console.log(data)
    this.dataSelected = data;
    // this.loadData();
  }
  constructor(
    private departmentsService: DepartmentsService,
     private router: Router 
  ) {}

  submitted = false;
  jobList: any;
  departmentList: any = [];
  employeeList: any = [];

  
  ngOnInit(): void {
    this.departmentsService.getDepartments().subscribe({
      next: (res: any) => {
        this.departments = res.data;
        console.log(this.departments);
      },
      error: (error) => {
        console.log(error);
      },
    })

    
  }

  add() {
    this.router.navigate(['employee-add'], {replaceUrl:true});
  }
  back() {
    this.router.navigate(['dashboard'], { replaceUrl: true });
  }

  loadData(){
    this.departmentsService.getDepartments().subscribe({
      next: (res: any) => {
        this.departments = res;
        // console.log(res);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  showDialog() {
    this.display = true;
  }


  delete(departmentId:number){
    console.log(departmentId);
    this.departmentsService.deleteDepartment(departmentId).subscribe({
      next: (res: any) => {
        this.departments = res;
        console.log(res);
        this.loadData();
      },
      error: (error: any) => {
        console.log(error);
      },
    })
  }
}