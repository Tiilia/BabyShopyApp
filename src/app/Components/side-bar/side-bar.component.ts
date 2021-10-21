import { ApiService } from './../../Services/api.service';
import { Category } from './../../Models/category';
import { Component, OnInit } from '@angular/core';
import { NbMenuItem, NbMenuService } from '@nebular/theme';
import { NbAuthService } from '@nebular/auth';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  //public links: Link[] = [];
  public categoriesList?: Category[]
  public categoryMenuItem: NbMenuItem[] = []
  public isAuth: boolean = false;

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
      icon: "unlock-outline",
      hidden: this.isAuth,
      children: [
        {
          title: "Login",
          link: "/auth/login",
        },
        {
          title: "Register",
          link: "/auth/register"
        },
      ]
    },
    {
      title: "Account",
      icon: "person-outline",
      hidden: !this.isAuth,
      children: [
        {
          title: "Card"
        }
      ]
    }


  ]
  public catMenu(){  
    let list;
    if (this.categoriesList){
      for (let i = 0; i < this.categoriesList.length; i++){      
        list = { 
          title: this.categoriesList[i].NameCategory, 
          link: "/shop/" ,
          queryParams: { category: this.categoriesList[i].NameCategory}
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
   

  constructor( private _api: ApiService, private menuService: NbMenuService, private _autService: NbAuthService) { }

  ngOnInit(): void {
        this._api.getAllCategories().subscribe(res => { this.categoriesList = res;
        // if (this.categoriesList) console.log("go");
        this.catMenu();
        //this.addMenuCat()
        console.log(`token: ${this._autService.getToken()}
        auth? ${this._autService.isAuthenticated()}`);
        
        });
  }

}
