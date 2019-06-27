import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
//import { UserService } from '../../../assets/js/jquery-2.1.1.min.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UserService]
})
export class HomeComponent implements OnInit {

  public user: User;
  public identity;
  public token;

  constructor( private _userService:UserService) {
    this.user = new User('','','','','','','','','','ROLE_USER');
   }

  ngOnInit() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    $.getScript('../../../assets/js/jquery-2.1.1.min.js');
    $.getScript('../../../assets/js/bootstrap/js/bootstrap.min.js');
    $.getScript('../../../assets/js/jquery.easing-1.3.min.js');
    $.getScript('../../../assets/js/jquery.dcjqaccordion.min.js');
    $.getScript('../../../assets/js/owl.carousel.min.js');
    $.getScript('../../../assets/js/custom.js');
  }

  logout(){
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.clear();
    this.identity = null;
    this.token = null;
  }

}
