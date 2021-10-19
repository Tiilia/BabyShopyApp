import { ApiService } from './../../Services/api.service';
import { Category } from './../../Models/category';
import { Link } from './../../Models/link';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

}
