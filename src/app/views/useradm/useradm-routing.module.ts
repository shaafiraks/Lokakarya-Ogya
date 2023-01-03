import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './user/user.component';
import { RoleComponent } from './role/role.component';
import { RoleMenuComponent } from './role-menu/role-menu.component';
import { MenuComponent } from './menu/menu.component';
import { HakAksesComponent } from './hak-akses/hak-akses.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: '',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'Useradm',
      },
      {
        path: 'user',
        component: UserComponent,
        data: {
          title: 'User',
        },
      },
      {
        path: 'role',
        component: RoleComponent,
        data: {
          title: 'Role',
        },
      },
      {
        path: 'role-menu',
        component: RoleMenuComponent,
        data: {
          title: 'Role Menu',
        },
      },
      {
        path: 'menu',
        component: MenuComponent,
        data: {
          title: 'Menu',
        },
      },
      {
        path: 'hak-akses',
        component: HakAksesComponent,
        data: {
          title: 'Hak Akses',
        },
      },
     
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UseradmRoutingModule { }
