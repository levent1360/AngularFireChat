export class FirebaseUser {
  key:string;
  Uid: string;
  UserName: string;
  UserType: string;
  UserMail: string;
  UserPassword: string;
  UserCdate: string;
  UserLastDate: string;
  UserUDate: string;
  UserStatus:boolean;
}

export class UserTypes {
  typeId: string;
  typeName: string;
}
export class Messages {
  key: string;
  MessageSender: string;
  MessageTo: string;
  MessageTime: string;
  MessageText: string;
}
export class ChatRooms {
  key: string;
  RoomName: string;
  RoomMessages?: [];
}