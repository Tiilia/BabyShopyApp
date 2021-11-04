import { UserAddress } from './../../Models/user-address';
import { User } from './../../Models/user';
import { NbAuthService } from '@nebular/auth';
import { ApiService } from './../../Services/api.service';
import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/Models/order';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public user?: User;
  public ordersList?: Order[];
  public address? : UserAddress;
  public spinner: boolean = true;
  // public total?: number;


  public getTotal(orderId: number){
    let total = 0;
    if( this.ordersList){
      for (const order of this.ordersList) {
        if (order.OrderId == orderId){
          for (const element of order.CartElements) {
            total += (element.Price - element.Discount)*element.Quantity
          }
        }
      }
    }
    return total.toFixed(2);
  }

  constructor( private _api: ApiService, private _authService: NbAuthService ) { }

  ngOnInit(): void {
    // get connected user
    this._authService.onTokenChange().subscribe((token) => {
      if (token.isValid()) {
        this.user = token.getPayload().data;

        if (this.user){

          // get user address
          this._api.getUserAddress(this.user.UserId).subscribe(res => {
            this.address = res;
          })

          // get orders
          this._api.getOrdersByUserId(this.user.UserId).subscribe(res => {
            this.ordersList = res;
            this.ordersList.reverse();
            this.spinner = false;
          })
        }
      }
    });
  }

}
