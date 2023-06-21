import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGaurd implements CanActivate {
  constructor(private authservice: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.authservice.USER$.pipe(
      tap((USER) => {
        if (USER.role.name === 'admin' || USER.role === 3) {
          return true;
        } else {
          this.router.navigate(['/noperm']);
          return false;
        }
      })
    );
  }
}
