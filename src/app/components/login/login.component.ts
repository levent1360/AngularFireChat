import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { FirebaseUser } from 'src/app/modules/firebase/firebase.module';
import { map } from 'rxjs/operators';
import { warning } from 'src/app/modules/info.module';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
public loginName="";

  public info= new warning(true,"","");
  user:FirebaseUser=new FirebaseUser()
  users:any
  constructor(public service: FirebaseService, public router:Router) { }


  ngOnInit() {
     }

  login(email, password) {
    if (email === "" || password === "") {
      this.info=new warning(false,"Boş alanları doldurunuz.","alert alert-danger");      
      return this.info;
    }
    else {
      this.service.Login(email,password).then(user=>{
        console.log(user)
        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['/chatroom']);
        this.info=new warning(false,"Kullanıcı adı ve parola Başarılı.","alert alert-success");  
        return this.info;
      }).catch(err=>{
        console.log(err)
        this.info=new warning(false,"Kullanıcı adı veya parola yanlış.","alert alert-danger");      
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
