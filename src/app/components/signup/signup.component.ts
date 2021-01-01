import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FirebaseUser } from 'src/app/modules/firebase/firebase.module';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';
import { warning } from 'src/app/modules/info.module';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public info= new warning(true,"","");
  user:FirebaseUser=new FirebaseUser()


  constructor(public service: FirebaseService, private router: Router) { }

  signup(name, email, password, password2) {
    if (name === "" || email === "" || password === "" || password2 === "") {
      this.info=new warning(false,"Boş alanları doldurunuz.","alert alert-danger");      
      return this.info;
    }
    else {
      if (password != password2) {
        this.info=new warning(false,"Girilen Şifre Uyuşmuyor!","alert alert-danger");      
        return this.info;
      }
      else {
        this.service.formSignUp(email, password).then(u => {
          this.user.Uid=u.user.uid;
          this.user.UserName=name;
          this.user.UserMail=u.user.email;
          // this.user.UserName=u.user.displayName;
          this.user.UserCdate=u.user.metadata.creationTime;
          // this.user.UserLastDate=u.user.metadata.lastSignInTime.toString();
          // this.user.UserUDate=u.user.metadata.creationTime.toString();
          this.user.UserType="Üye"
          this.service.createUser(this.user);
          setTimeout(() => {
            this.router.navigateByUrl('/login');
          }, 4000);
          name = '';
          email = '';
          password = '';
          password2 = '';
          this.info=new warning(false,"Kayıt Başarılı. 4 saniye içinde yönlendirileceksiniz...","alert alert-success");      
          return this.info;
        }).catch(err => {
          console.log(err);
          if (err.code == "auth/weak-password") {
            this.info=new warning(false,"Parola en az 6 karakter olmalıdır.","alert alert-danger");      
            return this.info;
          } else if (err.code == "auth/invalid-email") {
            this.info=new warning(false,"Geçersiz e-posta biçimi","alert alert-danger");      
            return this.info;
          } else { }
        });
      }
    }
  }

  ngOnInit() {
  }
}
