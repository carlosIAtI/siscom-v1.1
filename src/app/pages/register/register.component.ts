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

  public user: User;
  public identity;
  public token;
  public alertRegister;

  constructor( private _userService:UserService) {
    this.user = new User('','','','','','','','','','ROLE_USER');
   }

  ngOnInit() {
     this.identity = this._userService.getIdentity();
     this.token = this._userService.getToken();

     console.log(this.identity);
     console.log(this.token);
  }

  onSubmitRegister(){
    console.log(this.user);

    this._userService.register(this.user).subscribe(
      response => {
        let user = response.user;
        this.user = user;

        if(!user._id){
          this.alertRegister = 'Error al registrarse';
        }else{
          this.alertRegister = 'El registro se ha realizado correctamente';
          //this.user = new User('','','','','','','','','','ROLE_USER');
          alert('El registro se ha realizado correctamente. Por favor, inicie sesión con sus credenciales.');
          location.replace("http://localhost:4200/login");
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
