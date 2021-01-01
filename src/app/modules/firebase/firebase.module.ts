export class FirebaseUser {
  Uid: string;
  UserName?: string;
  UserType?: string;
  UserMail?: string;
  UserPassword?: string;
  UserCdate?: string;
  UserLastDate?: string;
  UserUDate?: string;
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