import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { Message } from '../models/Message';

@Injectable()
export class MessageService {
  messageCollection: AngularFirestoreCollection<Message>;

  constructor(
    private afs: AngularFirestore
  ) {
    this.messageCollection = this.afs.collection('messages');
   }

   newMessage(message: Message){
    this.messageCollection.add(message);
   }

}
