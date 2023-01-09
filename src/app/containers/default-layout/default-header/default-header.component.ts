import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  nama : any = localStorage.getItem('nama');
  username : any = localStorage.getItem('username');
  data : any = localStorage.getItem('data');
  objData = JSON.parse(this.data || '{}');
  photoUrl: any = `./assets/img/avatars/${this.username}.png`

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  constructor(
    private classToggler: ClassToggleService,
    private _router : Router) {
    super();
  }

  logout(){
    this._router.navigate(['login']);
    localStorage.clear();
  }
}
