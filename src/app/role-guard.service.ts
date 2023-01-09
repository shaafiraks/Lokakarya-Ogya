import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({

  providedIn: 'root'
})

//ROLE GUARD
export class RoleGuardService implements CanActivate {

  currentRole: any = '';
  constructor(private _router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const expectedRole = next.data['expectedRole'];
    const data = localStorage.getItem('data');
    const objData = JSON.parse(data || '{}');

    for (let i = 0; i < objData.length; i++) {
      if (objData[i].roles.nama !== expectedRole) {
        for (let j = 0; j < objData.length; j++) {
          if (objData[j].roles.nama == expectedRole) {
            this.currentRole = expectedRole;
            break;
          }
        }
      } else {
        this.currentRole = expectedRole;
      }
    }
    if (
      !this.loggedIn ||
      this.currentRole !== expectedRole
    ) {
      this._router.navigate(['/dashboard']);
      return false;
    }
    return true;
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('token') != null);
  }

  //   constructor(private _router : Router) { }
  //   canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot){
  //     const expectedRole = next.data['expectedRole'];
  //     const roleName = localStorage.getItem('roles')
  //     if (
  //       !this.loggedIn || 
  //       roleName !== expectedRole
  //     ) {
  //       this._router.navigate(['/dashboard']);
  //       return false;
  //     }
  //     return true;
  // }

  // public get loggedIn(): boolean{
  //   return (localStorage.getItem('token')!= null);
  //   }
}
