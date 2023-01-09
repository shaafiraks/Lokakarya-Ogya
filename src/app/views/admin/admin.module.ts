import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmPopupModule} from 'primeng/confirmpopup';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {ToastModule} from 'primeng/toast';
import {SplitButtonModule} from 'primeng/splitbutton';
import {InputMaskModule} from 'primeng/inputmask';
import {PasswordModule} from 'primeng/password';
import {InputTextModule} from 'primeng/inputtext';
import {DividerModule} from 'primeng/divider';
import {DropdownModule} from 'primeng/dropdown';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {InputNumberModule} from 'primeng/inputnumber';
import {TooltipModule} from 'primeng/tooltip';
import {MultiSelectModule} from 'primeng/multiselect';

import {
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  ListGroupModule,
  SharedModule
} from '@coreui/angular';

import { AdminRoutingModule } from './admin-routing.module'
import { DocsComponentsModule } from '@docs-components/docs-components.module';

import { TableModule } from 'primeng/table'
import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import {DialogModule} from 'primeng/dialog';
import { UserComponent } from './user/user.component';
import { MenuComponent } from './menu/menu.component';
import { RoleComponent } from './role/role.component';
import { RoleMenuComponent } from './role-menu/role-menu.component';
import { HakAksesComponent } from './hak-akses/hak-akses.component';
import { SubMenuComponent } from './sub-menu/sub-menu.component';

@NgModule({
  declarations: [
    UserComponent,
    MenuComponent,
    RoleComponent,
    RoleMenuComponent,
    HakAksesComponent,
    SubMenuComponent,
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
    ToastModule,
    SplitButtonModule,
    InputMaskModule,
    PasswordModule,
    InputTextModule,
    DividerModule,
    AutoCompleteModule,
    InputNumberModule,
    TooltipModule,
    MultiSelectModule
  ]
})
export class AdminModule {
}
