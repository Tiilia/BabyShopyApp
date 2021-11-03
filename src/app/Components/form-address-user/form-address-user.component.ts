import { Router } from '@angular/router';
import { CartElement } from './../../Models/cart-element';
import { UserAddress } from './../../Models/user-address';
import { User } from './../../Models/user';
import { NbAuthService } from '@nebular/auth';
import { Country } from './../../Models/country';
import { ApiService } from './../../Services/api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Order } from 'src/app/Models/order';

@Component({
  selector: 'app-form-address-user',
  templateUrl: './form-address-user.component.html',
  styleUrls: ['./form-address-user.component.scss']
})
export class FormAddressUserComponent implements OnInit {

  public user!: User;
  public userAdress?: UserAddress;
  public cartList!: CartElement[]; 
  public countriesList: Country[] = []
  public userForm?: FormGroup;
  public selectedItem: string = "Belgium"


  public order(){
    // console.log(this.userForm);
    if (this.userForm){
      let infoUser: UserAddress = {
        UserId: this.user?.UserId,
        FirstName: this.userForm.value["firstNameControl"],
        LastName: this.userForm.value["lastNameControl"],
        Address: this.userForm.value["addressControl"],
        AddressNumber: this.userForm.value["addressNumberControl"],
        City: this.userForm.value["cityControl"],
        PostalCode: this.userForm.value["postalCodeControl"],
        CountryName: this.selectedItem
      }
      // console.log(infoUser);
      // console.log(this.cartList);
      let order: Order = {
        UserId: this.user.UserId,
        OrderDate: new Date(),
        Status: "In preparation",
        UserAddress: infoUser,
        CartElements: this.cartList
      }
      this._api.postOrderByUserId(order).subscribe(data => {
        console.log(data);
        this.cartList.forEach(element => {
          this._api.deleteAllProductsToCartByBasketDetailsId(element).subscribe()      
        });
        this._route.navigate(["order/validate"])
      })
      
      //console.log(order);
      
    }
    
  }

  constructor(private _formBuilder: FormBuilder, private _api: ApiService, private _authService: NbAuthService, private _route: Router) { }

  ngOnInit(): void {
    // get countries list
    this._api.getAllCountries().subscribe(res => this.countriesList = res)

    // get connected user
    this._authService.onTokenChange().subscribe((token) => {
          if (token.isValid()) {
            this.user = token.getPayload().data;
            
            if (this.user){

              // get cart details
              this._api.getCartElementsByUserId(this.user.UserId).subscribe( res => {
                this.cartList = res;
              })

              // get user address informations
              this._api.getUserAddress(this.user.UserId).subscribe(res => {
                this.userAdress = res;
                console.log(res);
                


                // form control
                this.userForm = this._formBuilder.group({
                  firstNameControl: [ this.userAdress.FirstName ,  // valeur par défaut peut valoir null
                    Validators.compose(
                      [Validators.required, Validators.minLength(2), Validators.maxLength(50)]
                      )],
                  lastNameControl: [ this.userAdress.LastName,
                    Validators.compose(
                      [Validators.required, Validators.minLength(2), Validators.maxLength(50)]
                      )],
                  addressControl: [ this.userAdress.Address,
                    Validators.compose(
                      [Validators.required, Validators.minLength(2), Validators.minLength(100)]
                    )],
                  addressNumberControl: [ this.userAdress.AddressNumber,
                    Validators.compose(
                      [Validators.required, Validators.minLength(1), Validators.minLength(20)]
                    )],
                  cityControl: [ this.userAdress.City,
                    Validators.compose(
                      [Validators.required, Validators.minLength(2), Validators.minLength(50)]
                    )],
                  postalCodeControl: [ this.userAdress.PostalCode,
                    Validators.compose(
                      [Validators.required]
                    )],
                });
                if (this.userAdress.CountryName) this.selectedItem = this.userAdress.CountryName;
              })
            }
          }
      });


    
  }

}
