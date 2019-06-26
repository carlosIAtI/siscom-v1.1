import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})

export class RegisterComponent implements OnInit {
  public user_register: User;
  public alertRegister;

  constructor( private _userService:UserService) {
    this.user_register= new User('','','','','','','ROLE_USER');
    
   }
  ngOnInit() {
  }

  onSubmitRegister(){
    console.log(this.user_register);
    this._userService.register(this.user_register).subscribe(
      response =>{
        let user = response.user_register;
        this.user_register = user;
        if(!user._id){
          this.alertRegister = 'Error al registrarse';
        }else{
          this.alertRegister = 'El registro se ha usado correctamente';
          this.user_register= new User('','','','','','','ROLE_USER');

        }

      },
      error => {
        var errorMessage = <any>error;

        if(errorMessage != null){
          this.alertRegister = error.error.message;
          console.log(error);
        }
      }
      
    );
  }

}
