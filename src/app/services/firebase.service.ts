import { FirebaseUser, Messages, UserTypes } from './../modules/firebase/firebase.module';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private dbPathUser = '/Users';
  private dbPathUserType = '/UserType';
  private dbPathRooms = '/ChatRooms';
  private dbPathMessages = '/Messages';
  user: FirebaseUser = new FirebaseUser();

  UsersRef: AngularFireList<FirebaseUser> = null;
  TypeRef: AngularFireList<UserTypes> = null;

  constructor(public db: AngularFireDatabase, private firebaseAuth: AngularFireAuth) {this.UsersRef=db.list(this.dbPathUser) }

  createUser(user) {
    return this.getUSer().push(user);
  }
  UpdateUser(user:FirebaseUser) {
    return this. getUSer().update(user.key, user)
  }
  formSignUp(email: string, password: string) {
    return this.firebaseAuth.createUserWithEmailAndPassword(email, password);
  }

  Login(email: string, password: string) {
    return this.firebaseAuth.signInWithEmailAndPassword(email, password)
  }
  LogOut() {
    return this.firebaseAuth.signOut();
  }
  createUserType(id, name) {
    const Tref = this.TypeRef.push({
      typeId: id,
      typeName: name
    });
    return Tref;
  }

  getUSer(): AngularFireList<FirebaseUser> {
    return this.db.list(this.dbPathUser);
  }

  getUserByUid(uid:string){
    return this.db.list(this.dbPathUser, q=> q.orderByChild('Uid').equalTo(uid));
  }
  getTypes(): AngularFireList<UserTypes> {
    return this.db.list(this.dbPathUserType);
  }
  getMessages(): AngularFireList<Messages> {
    return this.db.list(this.dbPathMessages);
  }

  createMessages(message) {
    return this.getMessages().push(message);
  }
}
