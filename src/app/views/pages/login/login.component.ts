import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthGuardService } from 'src/app/auth-guard.service';
import { LoginService } from './login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  
  nama = "";
  username = "";
  password = "";
  roles: any = [];
  
  constructor(
    private _auth: AuthGuardService,
    private _router: Router,
    private loginService: LoginService,
    private messageService: MessageService,
    ) {
    if (this._auth.loggedIn) {
      this._router.navigate(['dashboard']);
    }
  }
  
  login() {
    this.loginService.login(this.username, this.password).subscribe({
      next: (res: any) => {
        var data = res.data[0].hakAkses;
        
        //sorting berdasarkan hakAksesId
        data = Object.keys(data).sort((a, b) => data[a].hakAksesId - data[b].hakAksesId).map(f => data[f]);
        
        //sorting berdasarkan roleMenu
        for (let i = 0; i < data.length; i++) {
          data[i].roles.roleMenu = Object.keys(data[i].roles.roleMenu).sort((a, b) => data[i].roles.roleMenu[a].roleMenuId - data[i].roles.roleMenu[b].roleMenuId).map(f => data[i].roles.roleMenu[f]);
        }
        
        console.log(data);
        localStorage.setItem('username', res.data[0].username);
        localStorage.setItem('nama', res.data[0].nama);
        localStorage.setItem('data', JSON.stringify(data));
        localStorage.setItem('token', 'x');
        localStorage.setItem('userId', res.data[0].userId);
        this._router.navigate(['dashboard']);
      },
      error: (error) => {
        console.error('ini error: ', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error Message',
          detail: error.error.message,
        });
        // alert(error.error.message);
      }
    });
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('token') != null);
  }


  // username = "";
  // password = "";
  // data: any = [];

  // constructor(
  //   private _auth: AuthGuardService,
  //   private _router: Router,
  //   private loginService: LoginService,
  // ) {
  //   if (this._auth.loggedIn) {
  //     this._router.navigate(['dashboard']);
  //   }
  // }

  // //login user
  // login() {
  //   console.log(this.username, 'username');
  //   console.log(this.password, 'password');
  //   this.loginService.login(this.username,this.password).subscribe({
  //     next: (res: any) => {
  //       console.log(res);

  //       //memasukkan data ke localstorage
  //       localStorage.setItem('username', res.data[0].username);
  //       localStorage.setItem('roles', res.data[0].hakAkses[0].roles.nama);
  //       localStorage.setItem('menu', JSON.stringify(res.data[0].hakAkses[0].roles.roleMenu));
  //       localStorage.setItem('userId', res.data[0].userId);
  //       localStorage.setItem('token', 'x');
  //       this._router.navigate(['dashboard']);
  //     },
  //     error: (error) => {
  //       console.error('ini error: ', error);
  //       alert(error.error.message);
  //     }
  //   });
  // }

}
