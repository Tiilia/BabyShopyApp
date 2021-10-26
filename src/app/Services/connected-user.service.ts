import { User } from './../Models/user';
import { NbAuthService } from '@nebular/auth';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConnectedUserService {

  public user?: User

  constructor(private _authService: NbAuthService) { }

  private async getUser(){
    this._authService.onTokenChange()
        .subscribe((token) => {
          if (token.isValid()) {
            this.user = token.getPayload().data; // here we receive a payload from the token and assigns it to our `user` variable 
            console.log(this.user);  
          }
        });
    }
}
