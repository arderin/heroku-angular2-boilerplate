import { Injectable }          from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {Auth} from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: Auth, private router: Router) {}

  canActivate() {
  	if(this.auth.authenticated()){
  		return true;
    }
    this.router.navigateByUrl("/");
    this.auth.login();
    return false;
  }
}
