import { ApiService } from './../../Services/api.service';
import { Category } from './../../Models/category';
import { Link } from './../../Models/link';
import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  //public links: Link[] = [];
  //public categoriesList: Category[] = []

  items: NbMenuItem[] = [
    {
      title: "Home",
      link: '',
    },
    {
      title: "Category",
      expanded: true,
      children: []
    }
  ]

  constructor(
    //private _api: ApiService
  ) { }

  ngOnInit(): void {
        //this._api.getAllCategories().subscribe(res => this.categoriesList = res);
        //this.links.push(new Link("Home", "/"));
  }

}
