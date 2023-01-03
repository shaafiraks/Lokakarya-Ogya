import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuardService } from 'src/app/auth-guard.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  username = "";
  password = "";
  data: any =[]

  constructor(
    private _auth: AuthGuardService,
    private _router: Router,
    private loginService: LoginService,
  ) {
    if(this._auth.loggedIn){
      this._router.navigate(['dashboard']);
    }
   }

   login(){

    console.log(this.username, 'username')
    console.log(this.password, 'password')

    this.loginService.login(this.username, this.password).subscribe({
      next: (res: any) => {
        console.log(res);

        // memasukan data ke local storage
        localStorage.setItem('username', res.data[0].username);
        localStorage.setItem('roles', (res.data[0].hakAkses[0].roles.nama));
        localStorage.setItem('menu', JSON.stringify(res.data[0].hakAkses[0].roles.roleMenu));
        localStorage.setItem('userId', res.data[0].userId);
        localStorage.setItem('token', 'x');
        this._router.navigate(['dashboard']);
      },
      error: (error) => {
        console.log('Ini error: ' + error);
        alert(error.error.message);
      }
    });
    // if(this.username == 'nn' && this.password == 'x'){
    // localStorage.setItem('token', 'x')
    // localStorage.setItem('role', 'nasabah')
    // this._router.navigate(['dashboard']);
    // } else {
    //   alert('Gagal Login')
    // }

   }

}
