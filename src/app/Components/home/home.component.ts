import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NbAuthService } from '@nebular/auth';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public isAuth?: boolean; 
  public isOpen = false

  public onClose(){
    this.isOpen = false
  }


  constructor(private _autService: NbAuthService) { }

  ngOnInit(): void {
    this._autService.isAuthenticatedOrRefresh().subscribe(auth => {
      this.isAuth = auth;
      this.isOpen = this.isAuth
    })

  }

}
