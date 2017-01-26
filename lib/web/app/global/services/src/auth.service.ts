import {Injectable, NgZone} from '@angular/core';
import {Router } from "@angular/router";
import {AuthHttp, tokenNotExpired} from 'angular2-jwt';
import { Configuration } from '../../../app.constants'; 
import { NotificationsService} from 'angular2-notifications/components';

// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class Auth {
  lock: any;
  refreshSubscription: any;
  user: any;
  zoneImpl: NgZone;

  constructor(
    private authHttp: AuthHttp,
    zone: NgZone,
    private router: Router,
    private constants: Configuration,
    private _notificationsService: NotificationsService ) {
    this.lock = new Auth0Lock(constants.auth0ClientID, constants.auth0Domain);
    this.zoneImpl = zone;
    this.user = JSON.parse(localStorage.getItem('profile'));
  }

  public authenticated() {
    // Check if there's an unexpired JWT
    return tokenNotExpired();
  }

  public getUser(): any{
    return this.user;
  }

  public login() {
    // Show the Auth0 Lock widget
    this.lock.show({
      loginAfterSignup: false,
      icon: "/images/logo.png"

    }, (err, profile, token) => {
      if (err) {
        this._notificationsService.error('Login Error:', err);
        console.debug(err);
        return;
      }
      // If authentication is successful, save the items
      // in local storage
      this._notificationsService.success('Login Successful', 'Welcome back ' + profile.nickname );
      localStorage.setItem('profile', JSON.stringify(profile));
      localStorage.setItem('id_token', token);
      this.zoneImpl.run(() => this.user = profile);

    });
  }

  public logout() {
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');
    this.zoneImpl.run(() => this.user = null);
    this.router.navigateByUrl('/');
  }
}
