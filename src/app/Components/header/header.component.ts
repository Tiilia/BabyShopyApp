import { Link } from './../../Models/link';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public links: Link[];

  constructor() {
    this.links = [];
   }

  ngOnInit(): void {
    this.links.push(new Link("Home", "/"))
  }

}
