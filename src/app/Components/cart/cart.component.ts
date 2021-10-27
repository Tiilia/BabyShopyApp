import { DeleteAllProductsCart } from './../../Models/delete-all-products-cart';
import { TotalCart } from './../../Models/total-cart';
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
  public totalCart?: TotalCart;


  public addOneOnQuantity(idBasketDetails: number, quantity: number){
    this._api.updateProductQuantityByBasketDetailsId({ BasketDetailsId: idBasketDetails, Quantity: quantity+=1 })
      .subscribe(data =>  console.log(data))
  }
  public sousOneOnQuantity(idBasketDetails: number, quantity: number){
    if ((quantity -= 1) > 0){
      this._api.updateProductQuantityByBasketDetailsId({ BasketDetailsId: idBasketDetails, Quantity: quantity })
      .subscribe(data =>  console.log(data))
    } else {
      this.deleteProduct(idBasketDetails)
    }
  }

  // delete one
  public deleteProduct(idBasketDetails: number){
    this._api.deleteOneProductToCartByBasketDetailsId({ BasketDetailsId: idBasketDetails })
      .subscribe(data =>  console.log(data))
  }
  // delete all
  public deleteAllProducts(){
    if (this.user){
      this._api.deleteAllProductsToCartByBasketDetailsId({ BasketId: this.user.BasketId })
      .subscribe(data =>  console.log(data))
    }
    
  }
  

  constructor(private authService: NbAuthService, private _api: ApiService) { }

  ngOnInit(): void {

  this.authService.onTokenChange().subscribe( (token) => {
    if (token.isValid()) {
      this.user = token.getPayload().data;  
    
    if (this.user){
      //console.log('ok');

      // get cart list
      this._api.getCartElementsByUserId(this.user.UserId).subscribe( (res) => this.cartElementsList = res)

      //get total cart
      this._api.getTotalCardbyUserId(this.user.UserId).subscribe( (res) => {
        this.totalCart = res;
        console.log(this.totalCart);
        
      })
    }}
  });
    console.log(`logueur cart list: ${this.cartElementsList}`);
    
  }

}
