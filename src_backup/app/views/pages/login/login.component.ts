import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuardService } from 'src/app/auth-guard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private _auth: AuthGuardService,
    private _router: Router
  ) {
    if(this._auth.loggedIn){
      this._router.navigate(['dashboard']);
    }
   }

   login(){
    localStorage.setItem('token', 'x')
    this._router.navigate(['dashboard']);
   }

}
