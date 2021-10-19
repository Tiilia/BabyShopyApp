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


  constructor( private _api: ApiService, private _route: ActivatedRoute ) { }

  ngOnInit(): void {
    this._api.getAllProducts().subscribe(res => this.productsList = res)
  }

}
