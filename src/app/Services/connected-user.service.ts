import { CartElement } from './../Models/cart-element';
import { ApiService } from './api.service';
import { User } from './../Models/user';
import { NbAuthService } from '@nebular/auth';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConnectedUserService {

  public user?: User
  // public cartElementsList?: CartElement[];

  constructor(private _authService: NbAuthService, private _api: ApiService) {
    // let user: User;
    this._authService.onTokenChange()
      .subscribe((token) => {
        if (token.isValid()) {
          this.user = token.getPayload().data; 
          console.log("connected");

          // if (this.user) {
          //   // get cart
          //   this._api.getCartElementsByUserId(this.user.UserId).subscribe((res) => {
          //     this.cartElementsList = res;       
          //     console.log(this.cartElementsList);
                 
          //   });
          // }
        }
      })
    }
  }
