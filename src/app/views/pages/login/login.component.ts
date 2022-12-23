import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuardService } from 'src/app/auth-guard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  username = "";
  password = "";

  constructor(
    private _auth: AuthGuardService,
    private _router: Router
  ) {
    if(this._auth.loggedIn){
      this._router.navigate(['dashboard']);
    }
   }

   login(){

    console.log(this.username, 'username')
    console.log(this.password, 'password')

    if(this.username == 'nn' && this.password == 'x'){
    localStorage.setItem('token', 'x')
    localStorage.setItem('role', 'nasabah')
    this._router.navigate(['dashboard']);
    } else {
      alert('Gagal Login')
    }

   }

}
