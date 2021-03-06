import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService  implements CanActivate{


  constructor( private _authService: NbAuthService, private _router: Router) { }

  canActivate() {
    return this._authService.isAuthenticated()
      .pipe(
        tap(authenticated => {
          if (!authenticated) {
            this._router.navigate(['auth/login'])
          }
        })
      )
  }

}
