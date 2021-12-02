import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
// declare var App: any;

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  urlImg: string;

  constructor(
    public _authsrv: AuthService
  ) { }

  ngOnInit(): void {
    // App.init();
    this._authsrv.currentUser.subscribe(data => {
      this.urlImg = `url(${ this._authsrv.activeUser ? this._authsrv.activeUser.images[0].url : 'user.png'})`;
    });
  }

}
