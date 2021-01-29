import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { ChatroomComponent } from './components/chatroom/chatroom.component';
import { UserComponent } from './components/user/user.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'chatroom', component:ChatroomComponent,
  canActivate: [AngularFireAuthGuard],
  data: {
    authGuardPipe: redirectLogin
  }},
  {path:'signup', component:SignupComponent},
  {path:'login', component:LoginComponent},
  {path:'user', component:UserComponent, 
  canActivate: [AngularFireAuthGuard],
  data: {
    authGuardPipe: redirectLogin
  }}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
