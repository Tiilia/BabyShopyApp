import { ApiService } from './../../Services/api.service';
import { Country } from './../../Models/country';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  public countriesList: Country[] = []
  public userForm!: FormGroup;
  public selectedItem: string = "Belgium"

  public order(){
    console.log(this.userForm);
    let infoUser = {
      FirstName: this.userForm.value["firstNameControl"],
      LastName: this.userForm.value["lastNameControl"]
    }
    console.log(infoUser);
    
      
    

    
  }
 

  constructor(private _formBuilder: FormBuilder, private _api: ApiService) { }

  ngOnInit(): void {
    // get countries list
    this._api.getAllCountries().subscribe(res => this.countriesList = res)

    // form control
    this.userForm = this._formBuilder.group({
      firstNameControl: [ null,  // valeur par défaut peut valoir null
        Validators.compose(
          [Validators.required, Validators.minLength(2), Validators.maxLength(50)]
          )],
      lastNameControl: [ null,
        Validators.compose(
          [Validators.required, Validators.minLength(2), Validators.maxLength(50)]
          )],
    });
  }

}
