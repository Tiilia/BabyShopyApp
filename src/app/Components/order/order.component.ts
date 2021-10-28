import { ApiService } from './../../Services/api.service';
import { Country } from './../../Models/country';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  public countriesList: Country[] = []
  public userForm?: FormGroup;
  public selectedItem: string = "Belgium"


  public initForm(){
    this.userForm = this._formBuilder.group({
      firstName: '',
      lastName: '',

    })
  }

  constructor(private _formBuilder: FormBuilder, private _api: ApiService) { }

  ngOnInit(): void {
    // get countries list
    this._api.getAllCountries().subscribe(res => this.countriesList = res)

    this.initForm();
  }

}
