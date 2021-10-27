import { Router } from '@angular/router';
import { ConnectedUserService } from './../../Services/connected-user.service';
import { User } from './../../Models/user';
import { ApiService } from './../../Services/api.service';
import { Component, OnInit } from '@angular/core';
import { NbAuthJWTToken, NbAuthService, NbTokenService } from '@nebular/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  
  public user?: User;

  public logout(){
    this._tokenService.clear()
    window.location.reload()
    this._router.navigate([''])
  }

  constructor(private authService: NbAuthService, private _connectedUser: ConnectedUserService, private _tokenService: NbTokenService,  private _router: Router) { }

  ngOnInit(): void {
  //this.user = this._connectedUser.user

  this.authService.onTokenChange()
      .subscribe((token) => {

        if (token.isValid()) {
          this.user = token.getPayload().data; // here we receive a payload from the token and assigns it to our `user` variable 
          console.log(this.user);  
        }
      });

  }

}
