import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CanActivate } from '@angular/router';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _login:LoginService,private _router : Router ) {}

  canActivate(
    next : ActivatedRouteSnapshot,
    state : RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(this._login.UserStatus()){
        return true;
      }else{
        this._router.navigate(['/login']);
        return false;
      }
        
    } 
}
