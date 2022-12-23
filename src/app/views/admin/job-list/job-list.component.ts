import { Component, OnInit } from '@angular/core';
import { JobService } from './job.service'

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {
  public cols: any = [];
  public jobs: any = [];

  constructor(
    private jobService: JobService,
    // private router: Router
  ) { }

  ngOnInit(): void {
    this.jobService.findAll().subscribe({
      next: (res: any) => {
        this.jobs = res;
        // console.log(res);
      },
      error: (error) => {
        console.error('ini error: ', error);
      }
    });
    this.cols = [
      { field: 'jobId', header: 'Job ID' },
      { field: 'jobTitle', header: 'Job Title' },
      { field: 'minSalary', header: 'Min Salary' },
      { field: 'maxSalary', header: 'Max Salary' },
  ];
  }

  add() {
    // this.router.navigate(["employee-add"], { replaceUrl: true });
  }

  edit(employeeId: number): void{
    // this.router.navigate(['employee-add', employeeId]);
  }


}
