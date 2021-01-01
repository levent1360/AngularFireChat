import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ChatRooms, FirebaseUser, Messages } from 'src/app/modules/firebase/firebase.module';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {

  room: ChatRooms = new ChatRooms();
  mesaj: Messages = new Messages();
  messages: any[];
  kisiler: FirebaseUser[];
  kisisec:any="";
  constructor(public service: FirebaseService) { }

  createMessage(text, e) {
    e.preventDefault();
    this.mesaj.MessageText = text;
    this.mesaj.MessageTime = this.getDate();
    this.mesaj.MessageTo = this.kisisec.UserName;
    this.mesaj.MessageSender = JSON.parse(localStorage.getItem('user')).user.email
    this.room.RoomName = this.mesaj.MessageTo + " - " + this.mesaj.MessageSender;
    if (text !== "") {
      this.service.createMessages(this.mesaj);
    } else {
    }
  }

  getDate() {
    const date = new Date().getTime().toString();
    return date;
  }
  getMessages() {
    this.service.getMessages().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => (
          { key: c.payload.key, ...c.payload.val() }
        )))).subscribe(messages => {
          this.messages = messages;
        });
  }

  kisiListele() {
    this.service.getUSer().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => (
          { key: c.payload.key, ...c.payload.val() }
        )))).subscribe(k => {
          this.kisiler = k;
        });
  }

  ngOnInit() {
    this.getMessages();
    this.kisiListele();
  }

  kisiSec(k:FirebaseUser){
    return this.kisisec=k;
  }

}
