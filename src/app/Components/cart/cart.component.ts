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
  public totalCart: number = 0;
  public isCartDetails: boolean = false


  // product +1
  public addOneOnQuantity(idBasketDetails: number){
    console.log(idBasketDetails);
    
      this.cartElementsList?.forEach(element => {
        if ( idBasketDetails === element.BasketDetailsId ) {
          console.log(element);
          
          element.Quantity +=1
          this._api.updateProductQuantityByBasketDetailsId(element)
            .subscribe(data =>  {
              console.log(`send: ${data}`);
              this.getTotalCart();
            })
        }
      });
  }
  // product -1
  public sousOneOnQuantity(idBasketDetails: number){
    this.cartElementsList?.forEach(element => {
      if ( idBasketDetails === element.BasketDetailsId){
        if ((element.Quantity -= 1) > 0){
          this._api.updateProductQuantityByBasketDetailsId(element)
          .subscribe(data =>  {
            console.log(data);
            this.getTotalCart();
          })
          
        } else {
          this.deleteProduct(idBasketDetails)
        }
      }
    })
  }

  // delete one
  public deleteProduct(idBasketDetails: number){
    this.cartElementsList?.forEach(element => {
      if ( idBasketDetails === element.BasketDetailsId){
        this._api.deleteOneProductToCartByBasketDetailsId(element)
          .subscribe(data =>  {
            console.log(data);
            location.reload();
          })
      }
    })
    
  }
  // delete all
  public deleteAllProducts(){
    this.cartElementsList?.forEach(element => {
    if (this.user){
      if (this.user.BasketId === element.BasketId){
        this._api.deleteAllProductsToCartByBasketDetailsId(element)
          .subscribe(data => {
            console.log(data);
            location.reload();
          })
      }
      
    }
  })
  }
  public getTotalCart(){
    this.totalCart = 0;
    if (this.cartElementsList){
      for (const element of this.cartElementsList) {
        if (element.NameProduct){
          console.log("hop");
          
          this.totalCart += (element.Price -element.Discount)*element.Quantity
        }          
      }
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
      this._api.getCartElementsByUserId(this.user.UserId).subscribe( (res) => {
        this.cartElementsList = res;
        this.cartElementsList.forEach(element => {
          if (element.BasketDetailsId) this.isCartDetails = true
          this.getTotalCart()
        });
      })

      
      // this._api.getTotalCardbyUserId(this.user.UserId).subscribe( (res) => {
      //   this.totalCart = res;
      //   console.log(this.totalCart);  
      // })

    }}
  });
    //console.log(`cart list: ${this.cartElementsList}`);
    
  }

}
