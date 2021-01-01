import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/login/login.component';
import { FirebaseUser, UserTypes } from './modules/firebase/firebase.module';
import { FirebaseService } from './services/firebase.service';
import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
loginName;
  title = 'AngFireChatApp';
  constructor() { }
  ngOnInit(): void {
  this.isLoggin();
  }

  isLoggin(){
    if(localStorage.getItem('user')){
      this.loginName=JSON.parse(localStorage.getItem('user')).user.email;

    }else{
      this.loginName="";
    }
  }


}
