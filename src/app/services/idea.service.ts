import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { Idea } from '../models/Idea';

@Injectable()
export class IdeaService {
  ideasCollection: AngularFirestoreCollection<Idea>;
  ideaDoc: AngularFirestoreDocument<Idea>;
  userIdeas: Observable<Idea[]>;
  ideas: Observable<Idea[]>;
  idea: Observable<Idea>;

  constructor(
    private afs: AngularFirestore
  ) { }

  newIdea(user: string, idea: Idea) {
    this.afs.collection(`users/${user}/ideas`).add(idea);
  }

  getIdeas(user: string): Observable<Idea[]> {
    this.userIdeas = this.afs.collection(`users/${user}/ideas`, ref => ref.orderBy('date','asc')).snapshotChanges().map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as Idea;
        data.id = action.payload.doc.id;
        return data;
      });
    });
    
    return this.userIdeas;
  }

  getIdea(user: string, id: string): Observable<Idea> {
    this.ideaDoc = this.afs.doc(`users/${user}/ideas/${id}`);
    this.idea = this.ideaDoc.snapshotChanges().map(action => {
      if(action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as Idea;
        data.id = action.payload.id;
        return data;
      }
    });

    return this.idea;
  }

  updateIdea(user: string, idea: Idea) {
    this.ideaDoc = this.afs.doc(`users/${user}/ideas/${idea.id}`);
    this.ideaDoc.update(idea);
  }

  deleteIdea(user: string, idea: Idea) {
    this.ideaDoc = this.afs.doc(`users/${user}/ideas/${idea.id}`);
    console.log(this.ideaDoc);
    this.ideaDoc.delete();
  }

}
