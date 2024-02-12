import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo, User } from '../interfaces/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'; // 
import 'firebase/firestore';
import { Observable, map, observeOn } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private itemsCollection: AngularFirestoreCollection<User>;

  constructor(private firestore: AngularFirestore) {
    this.itemsCollection = this.firestore.collection<User>('Users');
  }

  getUsers(): Observable<any[]> {
    return this.firestore.collection('Users').valueChanges();
  }

  getTodo(): Observable<any[]>{
    return this.firestore.collection('Todo').valueChanges();
  }

  addItem(item: User): Observable<any> {
    return new Observable<any>(observer =>{
      this.firestore.collection('Users').add(item)
      .then(response =>{
        observer.next(response);
        observer.complete();
      })
      .catch(error =>{
        observer.error(error)
      });
    })
    
  }

  updateItem(id: string, item: User): Promise<void> {
    return this.itemsCollection.doc(id).update(item);
  }

  deleteItem(id: string): Promise<void> {
    return this.itemsCollection.doc(id).delete();
  }

}
