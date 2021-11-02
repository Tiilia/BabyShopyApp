import { NbAuthService } from '@nebular/auth';
import { CartElement } from './../../Models/cart-element';
import { User } from './../../Models/user';
import { ApiService } from './../../Services/api.service';
import { Country } from './../../Models/country';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  
  public user?: User;
  public cartList?: CartElement[];   
 

  constructor( private _api: ApiService, private _authService: NbAuthService) { }

  ngOnInit(): void {

    // get connected user
    this._authService.onTokenChange().subscribe((token) => {
      if (token.isValid()) {
        this.user = token.getPayload().data;

        if (this.user){
          // get cart details
          this._api.getCartElementsByUserId(this.user.UserId).subscribe( res => {
            this.cartList = res;
          })
        }
      }
    });
  }

}
