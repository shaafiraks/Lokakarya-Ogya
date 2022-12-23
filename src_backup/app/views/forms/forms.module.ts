import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  ButtonGroupModule,
  CardModule,
  DropdownModule,
  FormModule,
  GridModule,
  ListGroupModule,
  SharedModule
} from '@coreui/angular';

import { DocsComponentsModule } from '@docs-components/docs-components.module';

import { FormsRoutingModule } from './forms-routing.module';
import { RangesComponent } from './ranges/ranges.component';
import { FloatingLabelsComponent } from './floating-labels/floating-labels.component';
import { FormControlsComponent } from './form-controls/form-controls.component';
import { SelectComponent } from './select/select.component';
import { ChecksRadiosComponent } from './checks-radios/checks-radios.component';
import { InputGroupsComponent } from './input-groups/input-groups.component';
import { LayoutComponent } from './layout/layout.component';
import { ValidationComponent } from './validation/validation.component';
import { DepartmentComponent } from './department/department.component';
import { EmployeesComponent } from './employees/employees.component';
import { JobsComponent } from './jobs/jobs.component';

import {TableModule} from 'primeng/table';
import {PaginatorModule} from 'primeng/paginator';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import { DepartmentsAddComponent } from './departments-add/departments-add.component';


@NgModule({
  declarations: [
    RangesComponent,
    FloatingLabelsComponent,
    FormControlsComponent,
    SelectComponent,
    ChecksRadiosComponent,
    InputGroupsComponent,
    LayoutComponent,
    ValidationComponent,
    DepartmentComponent,
    EmployeesComponent,
    JobsComponent,
    DepartmentsAddComponent
],
  imports: [
    CommonModule,
    FormsRoutingModule,
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
    TableModule,
    PaginatorModule,
    DialogModule,

  ]
})
export class CoreUIFormsModule {
}
