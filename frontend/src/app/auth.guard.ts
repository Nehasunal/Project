import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { HttpService } from "./http.service";
import {ActivatedRoute, Params, Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
constructor(public httpService: HttpService,
private router: Router,){}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(localStorage.getItem('token')){
        return true;
      
    }
    else{
      this.router.navigateByUrl('/login');
       return false;

    }

  }

}
