import { CartElement } from './../../Models/cart-element';
import { User } from './../../Models/user';
import { NbAuthService } from '@nebular/auth';
import { Category } from './../../Models/category';
import { Product } from './../../Models/product';
import { ApiService } from './../../Services/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  public productsList: Product[] = [];
  public categoryParams?: string;
  public categoryObj?: any;
  public category?: Category;
  public user?: User;
  public cartElementsList?: CartElement[]; 

  public addProductToCart( idProduct: number){
    if (this.user && idProduct){
      this._api.addProductToCartByProductId({ BasketId: this.user.BasketId, ProductId: idProduct, Quantity: 1 })
      .subscribe(data => {
        console.log(data);
        location.reload();
      })
      //window.location.reload()
    }
  }


  // verify if product's not in cart
  public isProductInCart(product: Product){
    // console.log('je verifie');
    
    // if (this.cartElementsList){
    //   this.cartElementsList.forEach(element => {
        
    //     if ( element.ProductId === productId) return true;
    //     else return false;
    //   });
    // }
    return this.cartElementsList?.map(ce => ce.ProductId).includes(product.ProductId)
  }



  constructor( private _api: ApiService, private _route: ActivatedRoute, private authService: NbAuthService) { }

  ngOnInit(): void {



    this._route.queryParamMap.subscribe((params) => {
      this.categoryObj = { ...params};
      // console.log(this.categoryObj);
      this.categoryParams = this.categoryObj.params.category;

       
      // product list
      this._api.getAllProducts().subscribe(res =>{
        this.productsList = res;
        console.log(this.categoryParams);

        // category filter
        if (this.categoryParams){
          this.productsList = this.productsList.filter(product => product.NameCategory == this.categoryParams);
          this._api.getCategoryByName(this.categoryParams).subscribe(res => this.category = res);
        }

      // get user 
      this.authService.onTokenChange().subscribe( (token) => {
        if (token.isValid()) {
          this.user = token.getPayload().data;  
        
          if (this.user){
          console.log('ok');
      
            // get cart list
            this._api.getCartElementsByUserId(this.user.UserId).subscribe( (res) => {
              this.cartElementsList = res;
              //this.isProductInCart();
          
            })
          }}
        })
      })
    })
  }
}
