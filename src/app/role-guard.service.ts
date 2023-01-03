import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(private _router : Router) { }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const expectedRole = next.data['expectedRole'];
    const roleName = localStorage.getItem('roles')
    if (
      !this.loggedIn || 
      roleName !== expectedRole
    ) {
      this._router.navigate(['/dashboard']);
      return false;
    }
    return true;
}

public get loggedIn(): boolean{
  return (localStorage.getItem('token')!= null);
  }
}
