import { Component, OnInit } from '@angular/core';
import { FirebaseUser } from 'src/app/modules/firebase/firebase.module';
import { FirebaseService } from 'src/app/services/firebase.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: FirebaseUser = new FirebaseUser();
  usertypes:any[];
  user: any[];
  constructor(public service: FirebaseService) { }
  create(name, id, type) {
    if (name === "" && id === "" && type=="") {
      window.alert('boş geçilemez');
    } else {
      
    }
  }
  getUSers() {
    this.service.getUSer().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => (
          { key: c.payload.key, ...c.payload.val() }
        )))).subscribe(user => {
          this.user = user;
        });
  }


  getTypes() {
    this.service.getTypes().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => (
          { key: c.payload.key, ...c.payload.val() }
        )))).subscribe(type => {
          this.usertypes = type;
        });
  }

  createUserType(typeid,typename){
    this.service.createUserType(typeid,typename);
  }

  ngOnInit() {
    this.getUSers();
    this.getTypes();
  }

}
