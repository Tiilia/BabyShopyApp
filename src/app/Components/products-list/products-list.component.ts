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




  constructor( private _api: ApiService, private _route: ActivatedRoute ) { }

  ngOnInit(): void {
    // this._route.queryParams.filter(params => params.category).subscribe(params =>  {
    //   this.categoryParams = params;
    //   console.log(this.categoryParams);
    // })
    this._route.queryParamMap.subscribe((params) => {
      this.categoryObj = { ...params};
      // console.log(this.categoryObj);
      this.categoryParams = this.categoryObj.params.category;

       
      this._api.getAllProducts().subscribe(res =>{
        this.productsList = res;
        console.log(this.categoryParams);
        if (this.categoryParams){
          this.productsList = this.productsList.filter(product => product.NameCategory == this.categoryParams);
          this._api.getCategoryByName(this.categoryParams).subscribe(res => this.category = res);
        }
      })
    })
  }

}
