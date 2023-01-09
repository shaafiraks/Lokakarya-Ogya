import { Component } from '@angular/core';
import { INavData } from '@coreui/angular';

import { navItems } from './_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent {

  data: any = localStorage.getItem('data');
  subMenu: any[] = [];
  countMenu: number = 0;
  countSubMenu: number = 0;
  public navItems: INavData[] = [];
  public pars: any = [];
  // public navItems = navItems;

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor() { }

  ngOnInit(): void {
    let data = localStorage.getItem('data')
    const objData = JSON.parse(data || '{}');


    this.navItems.push(
      {
        name: 'Beranda',
        url: '/dashboard',
        iconComponent: { name: 'cil-home' }
      },
    )
    for (let i = 0; i < objData.length; i++) {
      this.navItems.push({
        title: true,
        name: objData[i].roles.nama,
      })
      for (let j = 0; j < objData[i].roles.roleMenu.length; j++) {
        if (objData[i].roles.roleMenu[j].menu.subMenu.length > 0) {
          for (let k = 0; k < objData[i].roles.roleMenu[j].menu.subMenu.length; k++) {
            this.subMenu.push(
              {
                id: objData[i].roles.roleMenu[j].menu.subMenu[k].subMenuId,
                name: objData[i].roles.roleMenu[j].menu.subMenu[k].nama,
                url: objData[i].roles.roleMenu[j].menu.subMenu[k].url,
              })
          }
        }
        this.subMenu = Object.keys(this.subMenu).sort((a: any, b: any) => this.subMenu[a].id - this.subMenu[b].id).map(f => this.subMenu[Number(f)]);
        this.navItems.push(
          {
            name: objData[i].roles.roleMenu[j].menu.nama,
            url: objData[i].roles.roleMenu[j].menu.url,
            iconComponent: { name: objData[i].roles.roleMenu[j].menu.icon, },
            children: this.subMenu,
          })
        this.subMenu = [];
      }
    }
  }

  // data: any = localStorage.getItem('data');

  // public navItems: INavData[] = [];

  // public perfectScrollbarConfig = {
  //   suppressScrollX: true,
  // };

  // constructor() { }

  // ngOnInit(): void {
  //   console.log(JSON.stringify(this.navItems), 'nav nya');
  //   let menu = localStorage.getItem('menu');
  //   const objMenu = JSON.parse(menu || '{}');
  //   console.log(objMenu?.length);

  //   this.navItems.push({
  //     name: 'Dashboard',
  //     url: '/dashboard',
  //     iconComponent: { name: 'cil-home' },
  //   }, {
  //     title: true,
  //     name: 'Menu'
  //   },
  //   )
  //   for (let i = 0; i < objMenu.length; i++) {
  //     console.log(objMenu[i].menu.nama);
  //     this.navItems.push({
  //       name: objMenu[i].menu.nama,
  //       url: objMenu[i].menu.url,
  //       iconComponent: { name: objMenu[i].menu.icon }
  //     })

  //   }

  // }

}


