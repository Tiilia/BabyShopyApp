import { ApiService } from './../../Services/api.service';
import { Category } from './../../Models/category';
import { Link } from './../../Models/link';
import { Component, OnInit } from '@angular/core';
import { NbMenuItem, NbMenuService } from '@nebular/theme';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  //public links: Link[] = [];
  public categoriesList?: Category[]
  public categoryMenuItem: NbMenuItem[] = []

  public menuNav: NbMenuItem[] = [
    {
      title: "Home",
      link: '/',
      icon: "home-outline"
    },
    {
      title: "Category",
      expanded: true,
      icon: "book-open-outline",
      children: [
        {
          title: "All",
          link: "/shop",
        },
      ]
    },
    {
      title: "Auth",
      icon: "person-outline"
    }

  ]
  public catMenu(){  
    let list;
    if (this.categoriesList){
      for (let i = 0; i < this.categoriesList.length; i++){      
        console.log("ok");
        list = { 
          title: this.categoriesList[i].NameCategory, 
          link: "/shop/" ,
          queryParams: { category: this.categoriesList[i].NameCategory.toLowerCase()}
        }
        this.menuNav[1].children?.push(list)
      }
    }
  }
  // addMenuCat(){
  //   if (this.categoriesList){
  //     for (let i = 0; i < this.categoriesList.length; i++){
  //       this.menuService.addItems([{
  //           title: this.categoriesList[i].NameCategory,
  //           link: "/shop/"+this.categoriesList[i].NameCategory.toLowerCase()
  //     }], "menu")
  //   }}
  // }
   

  constructor( private _api: ApiService, private menuService: NbMenuService) { }

  ngOnInit(): void {
        this._api.getAllCategories().subscribe(res => { this.categoriesList = res;
        if (this.categoriesList) console.log("go");
        this.catMenu();
        //this.addMenuCat()
        });
  }

}
