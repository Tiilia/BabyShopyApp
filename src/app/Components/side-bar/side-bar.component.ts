import { CartElement } from './../../Models/cart-element';
import { User } from './../../Models/user';
import { ApiService } from './../../Services/api.service';
import { Category } from './../../Models/category';
import { Component, OnInit } from '@angular/core';
import { NbMenuItem, NbMenuService } from '@nebular/theme';
import { NbAuthService, NbTokenService } from '@nebular/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  //public links: Link[] = [];
  public categoriesList?: Category[];
  public categoryMenuItem: NbMenuItem[] = [];
  public isAuth?: boolean;
  public menuNav: NbMenuItem[] = [];
  public isAdmin: boolean = false;
  public user?: User;
  public cartElementsList?: CartElement[];
  public nbCartElements: number = 0


  public getMenuNav(){
  this.menuNav = [
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
      expanded: true,
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
      title: "Cart",
      link: "/cart",
      icon: "shopping-cart-outline",
      hidden: !this.isAuth,
      badge: {
        text: this.nbCartElements.toString(),
        status:'success',
      }
        // {
        //   title: "Logout",
        //   link: this.logout()
        // }
     
    },
    {
      title:'Admin',
      link: 'admin',
      hidden: !this.isAdmin,
      icon: "shield-outline",
      children: [
        {
          title: 'Reports',
          link: '/admin/report'
        }
      ]
    }


  ]}
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

  // public logout(){
  //   this._tokenService.clear()
  //   window.location.reload()
  //   this._router.navigate([''])
  // }
  // addMenuCat(){
  //   if (this.categoriesList){
  //     for (let i = 0; i < this.categoriesList.length; i++){
  //       this.menuService.addItems([{
  //           title: this.categoriesList[i].NameCategory,
  //           link: "/shop/"+this.categoriesList[i].NameCategory.toLowerCase()
  //     }], "menu")
  //   }}
  // }
   

  constructor( private _api: ApiService, private _authService: NbAuthService, private _tokenService: NbTokenService,  private _router: Router) {
   }

  ngOnInit(): void {
        
      this._authService.isAuthenticatedOrRefresh().subscribe(auth => {
        this.isAuth = auth;
        // console.log(this.isAuth);


      // get token
            this._authService.onTokenChange().subscribe( (token) => {
              if (token.isValid()) {
                this.user = token.getPayload().data;  
              
              if (this.user){
                //console.log('ok');

                // get cart list
                this._api.getCartElementsByUserId(this.user.UserId).subscribe( (res) => {
                  this.cartElementsList = res;
                  // console.log(this.cartElementsList);

                  // get number element in cart
                  this.cartElementsList.forEach(element => {
                    if (element.BasketDetailsId){
                        if (this.cartElementsList){
                          this.nbCartElements = this.cartElementsList.length
                          // console.log(this.nbCartElements)
                        }
                    } else { this.nbCartElements = 0}
                  });
                    
                  

                  if (this.user?.Role === 'admin'){
                  console.log('is admin');
                  this.isAdmin = true;
                } else this.isAdmin = false;
          
                this._api.getAllCategories().subscribe(res => { this.categoriesList = res;
                  // if (this.categoriesList) console.log("go");
                  this.catMenu();
                  //this.addMenuCat()
                });

                this.getMenuNav()
                  
                })


                
          
                  
              }}
              else { 
                this._api.getAllCategories().subscribe(res => { this.categoriesList = res;
                  // if (this.categoriesList) console.log("go");
                  this.catMenu();
                  //this.addMenuCat()
                });
                this.getMenuNav()}
            });


        
      })

      
  }

}
