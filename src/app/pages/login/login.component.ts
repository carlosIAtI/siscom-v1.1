import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})

export class LoginComponent implements OnInit {

  public title = "LOGIN";
  public user: User;
  public identity;
  public token;
  public errorMessage;

  constructor( private _userService:UserService) {
    this.user = new User('','','','','','','','','','ROLE_USER');
   }

   ngOnInit() {
     this.identity = this._userService.getIdentity();
     this.token = this._userService.getToken();

     console.log(this.identity);
     console.log(this.token);
  }

   public onSubmit(){
     console.log(this.user);

     // Conseguir los datos del usuario identificado
     this._userService.signup(this.user).subscribe(
       response => {
         let identity = response.user;
         this.identity = identity;

         if(!this.identity._id){
           alert('El usuario no está correctamente identificado');
         }else{
           // Crear elemento en el localstorage para tener al usuario en sesión
           localStorage.setItem('identity', JSON.stringify(identity));
        
           // Conseguir el token para enviarlo a cada petición http
           this._userService.signup(this.user, 'true').subscribe(
            response => {
              let token = response.token;
              this.token = token;
     
              if(this.token.length <= 0){
                alert('El token no se ha generado correctamente');
              }else{
                // Crear elemento en el localstorage para tener token disponible
                localStorage.setItem('token', token);

                console.log(token);
                console.log(identity);
                location.replace("http://localhost:4200");
              }
            },
            error => {
              var errorMessage = <any>error;
     
              if(errorMessage != null){
                this.errorMessage = error.error.message;
                console.log(error);
              }
            }
          );
         }
       },
       error => {
         var errorMessage = <any>error;

         if(errorMessage != null){
           this.errorMessage = error.error.message;
           console.log(error);
         }
       }
     );
   }

   logout(){
     localStorage.removeItem('identity');
     localStorage.removeItem('token');
     localStorage.clear();
     this.identity = null;
     this.token = null;
   }

}