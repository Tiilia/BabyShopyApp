import { Order } from 'src/app/Models/order';
import { ApiService } from './../../../Services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  public orderList? : Order[];
  public isLoad: boolean = false;

  constructor( private _api: ApiService ) { }

  ngOnInit(): void {
      this._api.getAllOrders().subscribe(res => {
        this.orderList = res;
        this.orderList.reverse();
        this.isLoad = true;
      })
  }

}
