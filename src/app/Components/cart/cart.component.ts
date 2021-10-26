import { CartElement } from './../../Models/cart-element';
import { ApiService } from './../../Services/api.service';
import { NbAuthService } from '@nebular/auth';
import { User } from './../../Models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public user?: User;
  public cartElementsList?: CartElement[]; 

  

  constructor(private authService: NbAuthService, private _api: ApiService) { }

  ngOnInit(): void {

  this.authService.onTokenChange().subscribe( (token) => {
    if (token.isValid()) {
      this.user = token.getPayload().data;  
    
    if (this.user){
      console.log('ok');
      
      this._api.getCartElementsByUserId(this.user.UserId).subscribe( res => this.cartElementsList = res)
    }}
  });

  }

}
