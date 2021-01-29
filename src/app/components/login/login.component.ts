import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { FirebaseUser } from 'src/app/modules/firebase/firebase.module';
import { map } from 'rxjs/operators';
import { warning } from 'src/app/modules/info.module';
import { JsonPipe } from '@angular/common';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginName = "";

  public info = new warning(true, "", "");
  user: FirebaseUser = new FirebaseUser()
  userGiris1: any;
  userGiris: FirebaseUser[]
  users: any;
  uid: string;
  constructor(public service: FirebaseService, public router: Router) { }


  ngOnInit() {
    this.getUSers();
  }

  login(email, password) {
    if (email === "" || password === "") {
      this.info = new warning(false, "Boş alanları doldurunuz.", "alert alert-danger");
      return this.info;
    }
    else {
      this.service.Login(email, password)
        .then(u => {
          localStorage.setItem('user', JSON.stringify(u));
          localStorage.setItem('uid',JSON.stringify(u.user.uid))
          this.router.navigate(['/chatroom']);
        })
        .catch(err => {
          console.log(err)
          this.info = new warning(false, "Kullanıcı adı veya parola yanlış.", "alert alert-danger");
          return this.info;
        })
    }

  }

  getDate() {
    const date = new Date().getTime().toString();
    return date;
  }

  getUSers() {
    this.service.getUSer().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => (
          { key: c.payload.key, ...c.payload.val() }
        )))).subscribe(users => {
          this.users = users;
        });
  }
}
