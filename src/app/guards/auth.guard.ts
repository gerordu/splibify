import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private _auths: AuthService,
    private notify: NotificationService,
    private router: Router
  ) { }

  canActivate(): boolean {
    if (!this._auths.activeUser) {
      this.notify.show('Primerio debes acceder con tu cuenta de Spotify',{type: 'error'});
      this.router.navigateByUrl('/home');
      return false;
    }
    return true;
  }
}
