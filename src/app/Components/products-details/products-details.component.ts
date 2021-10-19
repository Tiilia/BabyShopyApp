import { Product } from './../../Models/product';
import { ApiService } from './../../Services/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss']
})
export class ProductsDetailsComponent implements OnInit {

  public productId?: number;  
  public selectedProduct?: Product;


  private receiveId(params: Params){
    this.productId = Number(params["id"]);
  }

  public getProduct(){
    if (this.productId){
      this._api.getProductById(this.productId).subscribe(res => this.selectedProduct = res)
    }
  }

  constructor(private _api: ApiService, private _route: ActivatedRoute) { }

  ngOnInit( ): void {
    this._route.params.subscribe((params) => this.receiveId(params))
    this.getProduct()
    
  }

}
