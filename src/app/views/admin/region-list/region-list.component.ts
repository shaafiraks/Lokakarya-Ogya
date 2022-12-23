import { Component, OnInit } from '@angular/core';
import { RegionService } from './region.service'

@Component({
  selector: 'app-region-list',
  templateUrl: './region-list.component.html',
  styleUrls: ['./region-list.component.scss']
})
export class RegionListComponent implements OnInit {
  public cols: any = [];
  public regions: any = [];

  constructor(
    private regionService: RegionService,
    // private router: Router
  ) { }

  ngOnInit(): void {
    this.regionService.findAll().subscribe({
      next: (res: any) => {
        this.regions = res;
        // console.log(res);
      },
      error: (error) => {
        console.error('ini error: ', error);
      }
    });
    this.cols = [
      { field: 'regionId', header: 'Region ID' },
      { field: 'regionName', header: 'Region Name' },
  ];
  }

  add() {
    // this.router.navigate(["employee-add"], { replaceUrl: true });
  }

  edit(employeeId: number): void{
    // this.router.navigate(['employee-add', employeeId]);
  }


}
