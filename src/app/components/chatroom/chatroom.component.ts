import { JsonPipe } from '@angular/common';
import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
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
  kisisec: any = "";
  girisKullanici: any;
  isOwnMessage = true;
  girisKisi: FirebaseUser[];
  uid: string
  key: string


  @ViewChildren('messages') mes: QueryList<any>;
  @ViewChild('scroll') content: ElementRef;


  constructor(public service: FirebaseService) { }


  ngOnInit() {
    this.getMessages();
    this.kisiListele();
    this.girisKontrol();
    this.scrollToBottom();
    JSON.parse(localStorage.getItem('user')).user.email
    this.uid = JSON.parse(localStorage.getItem('uid'))
    this.KisiListeleByUid()
    console.log(this.girisKisi)
  }


  ngAfterViewInit() {
    this.scrollToBottom();
    this.mes.changes.subscribe(this.scrollToBottom);
  }

  scrollToBottom = () => {
    try {
      this.content.nativeElement.scrollTop = this.content.nativeElement.scrollHeight;
    } catch (err) { }
  }


  createMessage(text, e) {
    e.preventDefault();
    this.mesaj.MessageText = text;
    this.mesaj.MessageTime = this.getDate();
    this.mesaj.MessageTo = this.kisisec.UserMail;
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


  kisiSec(k: FirebaseUser) {
    console.log(k.UserMail)
    this.senderControl(k.UserMail);
    this.girisKontrol();
    return this.kisisec = k;
  }

  girisKontrol() {
    return this.girisKisi = JSON.parse(localStorage.getItem('user')).user.email;

  }

  senderControl(k: string) {
    if (JSON.parse(localStorage.getItem('user')).user.email == k) {
      this.isOwnMessage = true;
    }
    else {
      this.isOwnMessage = false;
    }
  }

  KisiListeleByUid() {
    this.service.getUserByUid(this.uid).snapshotChanges().subscribe(data => {
      this.girisKisi = [];
      data.forEach(satir => {
        const y = { ...satir.payload.toJSON(), key: satir.key };
        this.girisKisi.push(y as FirebaseUser);
      });
    });
  }

}
