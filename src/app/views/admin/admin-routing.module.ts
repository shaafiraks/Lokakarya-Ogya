import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user/user.component';
import { HakAksesComponent } from './hak-akses/hak-akses.component';
import { RoleComponent } from './role/role.component';
import { RoleMenuComponent } from './role-menu/role-menu.component';
import { MenuComponent } from './menu/menu.component';
import { SubMenuComponent } from './sub-menu/sub-menu.component';

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
        redirectTo: 'Admin',
      },
      {
        path: 'user',
        component: UserComponent,
        data: {
          title: 'User',
        },
      },
      {
        path: 'hak-akses',
        component: HakAksesComponent,
        data: {
          title: 'Hak Akses',
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
        path: 'sub-menu',
        component: SubMenuComponent,
        data: {
          title: 'Sub Menu',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
