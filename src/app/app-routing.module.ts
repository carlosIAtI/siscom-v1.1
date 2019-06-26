import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: '**', pathMatch: 'full', redirectTo: ''}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes ,{enableTracing:true})
  ],
  exports: 
  [
    RouterModule
  ]
})
export class AppRoutingModule { }
