import { Product } from './../../../Models/product';
import { ApiService } from './../../../Services/api.service';
import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/Models/order';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.scss']
})
export class ReportingComponent implements OnInit {

  public orderList? : Order[]
  public productList?: Product[];
  public orderNumber?: number
  public spinner: boolean = true;
  public bestProductCart?: ChartData<'bar'>

  public populateBestProduct(){
    let labels = [];
    let datasets = [];
    
    if (this.orderList && this.productList){

      // populate labels
      for (const product of this.productList) {
        labels.push(product.NameProduct)
      
        
        // populate datasets
        datasets.push(0)
        for (const order of this.orderList) {
          for (const element of order.CartElements) {
            if (element.NameProduct == product.NameProduct){
              let i = labels.indexOf(product.NameProduct)
              datasets[i] += element.Quantity              
            }
          }  
        }
      }
      this.bestProductCart = {
        labels: labels,
        datasets: [ { data: datasets, label: 'Products' } ]
      }

    }
  }

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10
      }
    },
    plugins: {
      legend: {
        display: true,
      }
    }
  };
  
  constructor( private _api: ApiService) { }

  ngOnInit(): void {
    this._api.getAllOrders().subscribe(res => {
      this.orderList = res;
      this.spinner = false;
      this.orderNumber =  this.orderList.length;
      

      //get all products
      this._api.getAllProducts().subscribe(res => {
          this.productList = res;
          this.populateBestProduct()
      })
    })

  }

}
