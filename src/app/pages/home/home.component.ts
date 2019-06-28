import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
//import { UserService } from '../../../assets/js/jquery-2.1.1.min.js';
import { DynamicScriptLoaderService } from '../../services/dynamic-script-loader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UserService, DynamicScriptLoaderService]
})
export class HomeComponent implements OnInit {

  public user: User;
  public identity;
  public token;

  constructor( private _userService:UserService, private dynamicScriptLoader: DynamicScriptLoaderService) {
    this.user = new User('','','','','','','','','','','ROLE_USER');
   }

  ngOnInit() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    
    this.loadScripts();

  }

  logout(){
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.clear();
    this.identity = null;
    this.token = null;
  }

  private loadScripts() {
    // You can load multiple scripts by just providing the key as argument into load method of the service
    this.dynamicScriptLoader.load('jquery','bootstrap','accordion','carousel','custom').then(data => {
      // Script Loaded Successfully
    }).catch(error => console.log(error));
  }

}
