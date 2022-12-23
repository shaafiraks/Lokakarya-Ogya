import { Component, OnInit } from '@angular/core';
import { LocationService } from './location.service'

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss']
})
export class LocationListComponent implements OnInit {
  public cols: any = [];
  public locations: any = [];

  constructor(
    private locationService: LocationService,
    // private router: Router
  ) { }

  ngOnInit(): void {
    this.locationService.findAll().subscribe({
      next: (res: any) => {
        this.locations = res;
        // console.log(res);
      },
      error: (error) => {
        console.error('ini error: ', error);
      }
    });
    this.cols = [
      { field: 'locationId', header: 'Location ID' },
      { field: 'streetAddress', header: 'Street Address' },
      { field: 'postalCode', header: 'Postal Code' },
      { field: 'city', header: 'City' },
      { field: 'stateProvince', header: 'State Province' },
      { field: 'countryId', header: 'Country ID' },
  ];
  }

  add() {
    // this.router.navigate(["employee-add"], { replaceUrl: true });
  }

  edit(employeeId: number): void{
    // this.router.navigate(['employee-add', employeeId]);
  }


}
