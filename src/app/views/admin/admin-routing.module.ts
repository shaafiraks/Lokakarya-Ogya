import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeListComponent } from './employee-list/employee-list.component';
import { DepartmentListComponent } from './department-list/department-list.component';
import { LocationListComponent } from './location-list/location-list.component';
import { CountryListComponent } from './country-list/country-list.component';
import { RegionListComponent } from './region-list/region-list.component';
import { JobListComponent } from './job-list/job-list.component';
import { MasterPelangganComponent } from './master-pelanggan/master-pelanggan.component';
import { TransaksiTelkomComponent } from './transaksi-telkom/transaksi-telkom.component';
import { TelpHistoryComponent } from './telp-history/telp-history.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Admin',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'Admin',
      },
      {
        path: 'employee-list',
        component: EmployeeListComponent,
        data: {
          title: 'Employees',
        },
      },
      {
        path: 'department-list',
        component: DepartmentListComponent,
        data: {
          title: 'Departments',
        },
      },
      {
        path: 'location-list',
        component: LocationListComponent,
        data: {
          title: 'Locations',
        },
      },
      {
        path: 'country-list',
        component: CountryListComponent,
        data: {
          title: 'Countries',
        },
      },
      {
        path: 'region-list',
        component: RegionListComponent,
        data: {
          title: 'Regions',
        },
      },
      {
        path: 'job-list',
        component: JobListComponent,
        data: {
          title: 'Jobs',
        },
      },
      {
        path: 'master-pelanggan',
        component: MasterPelangganComponent,
        data: {
          title: 'Master Pelanggan',
        },
      },
      {
        path: 'transaksi-telkom',
        component: TransaksiTelkomComponent,
        data: {
          title: 'Transaksi Telkom',
        },
      },
      {
        path: 'telp-history',
        component: TelpHistoryComponent,
        data: {
          title: 'Telp History',
        },
      }

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
