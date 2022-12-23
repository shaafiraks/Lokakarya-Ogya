import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmPopupModule} from 'primeng/confirmpopup';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import {
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FormModule,
  GridModule,
  ListGroupModule,
  SharedModule
} from '@coreui/angular';

import { AdminRoutingModule } from './admin-routing.module'
import { DocsComponentsModule } from '@docs-components/docs-components.module';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { DepartmentListComponent } from './department-list/department-list.component';
import { LocationListComponent } from './location-list/location-list.component';
import { CountryListComponent } from './country-list/country-list.component';
import { RegionListComponent } from './region-list/region-list.component';
import { JobListComponent } from './job-list/job-list.component';
import { TableModule } from 'primeng/table'
import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import {MenuItem} from 'primeng/api';  
import {DialogModule} from 'primeng/dialog';
import { MasterPelangganComponent } from './master-pelanggan/master-pelanggan.component';
import { TransaksiTelkomComponent } from './transaksi-telkom/transaksi-telkom.component';
import { TelpHistoryComponent } from './telp-history/telp-history.component';
import {CalendarModule} from 'primeng/calendar';
import {InputTextModule} from 'primeng/inputtext';

@NgModule({
  declarations: [
    EmployeeListComponent,
    DepartmentListComponent,
    LocationListComponent,
    CountryListComponent,
    RegionListComponent,
    JobListComponent,
    MasterPelangganComponent,
    TransaksiTelkomComponent,
    TelpHistoryComponent
  ],
  imports: [
    ConfirmDialogModule,
    ConfirmPopupModule,
    DialogModule,
    TableModule,
    AccordionModule,
    CommonModule,
    AdminRoutingModule,
    DocsComponentsModule,
    CardModule,
    FormModule,
    GridModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    FormModule,
    ButtonModule,
    ButtonGroupModule,
    DropdownModule,
    SharedModule,
    ListGroupModule,
    CalendarModule,
    InputTextModule,
  ]
})
export class AdminModule {
}
