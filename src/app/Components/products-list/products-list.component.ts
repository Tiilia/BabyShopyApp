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
    this.cartElementsList?.forEach(element => {
      if (element.ProductId === idProduct){
        if (this.user && idProduct){
          element.Quantity = 1
          this._api.addProductToCartByProductId(element)
            .subscribe(data => console.log(data))
            //window.location.reload()
    }
      }
    });
    
  }

  // ! ne s'active pas 
  // verify if product's not in cart
  public isProductInCart(idProduct: number){
    console.log('je verifie');
    
    if (this.cartElementsList){
      this.cartElementsList.forEach(element => {
        if ( element.ProductId === idProduct) return true;
        else return false;
      });
    }
  }
  // ! -----------------------------


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
        this._api.getCartElementsByUserId(this.user.UserId).subscribe( (res) => this.cartElementsList = res)
        

          }}
        })
      })
    })

  }
}
