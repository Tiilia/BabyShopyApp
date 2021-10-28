import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  public userForm?: FormGroup;

  public initForm(){
    this.userForm = this._formBuilder.group({
      firstName: '',
      lastName: '',

    })
  }

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

}
