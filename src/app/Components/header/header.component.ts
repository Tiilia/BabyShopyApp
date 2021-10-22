import { User } from './../../Models/user';
import { ApiService } from './../../Services/api.service';
import { Category } from './../../Models/category';
import { Link } from './../../Models/link';
import { Component, OnInit } from '@angular/core';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  
  user?: User;

  constructor(private authService: NbAuthService) {

    this.authService.onTokenChange()
      .subscribe((token) => {

        if (token.isValid()) {
          this.user = token.getPayload().data; // here we receive a payload from the token and assigns it to our `user` variable 
          console.log(this.user);  
        }
      });
  }

  ngOnInit(): void {

  }

}
