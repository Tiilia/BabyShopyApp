import { User } from './../Models/user';
import { Router } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService {

  public user?: User

  constructor( private _authService: NbAuthService, private _router: Router ) { }

  canActivate() {
    return this._authService.isAuthenticated()
      .pipe(
        tap(authenticated => {
          if (!authenticated) {
            this._router.navigate(['auth/login'])
          }
          else {
            this._authService.onTokenChange()
              .subscribe((token) => {
                if (token.isValid()) {
                  this.user = token.getPayload().data;  
                  if (this.user?.Role != 'admin'){
                    this._router.navigate([''])
                  }
                }
            });
          }
        })
      )
  }
}
