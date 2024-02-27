import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'firebase/compat/firestore'; // 
import 'firebase/firestore';
import { Observable, map, observeOn } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Reg,log } from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private firestore: AngularFirestore,private http: HttpClient) {

  }

  getUser(User_email: any): Observable<any> {
    const url = 'http://localhost:3000/user'
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    };
    return this.http.post<any>(url,User_email,httpOptions)
  }

  createUser(userData: any): Observable<any> {
    const url = 'http://localhost:3000/createUser'; // Adjust the port number if necessary
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(url,userData, httpOptions);
  }

  createTODO(TODOlist: any): Observable<any>{
    const url = 'http://localhost:3000/updateTodo'; // Adjust the port number if necessary
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(url,TODOlist, httpOptions);
  }

  getTODO(User_email: any){
    const url = 'http://localhost:3000/userTODO'
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    };
    return this.http.post<any>(url,User_email,httpOptions)
  }

  // updateItem(id: string, item: User): Promise<void> {
  //   return this.itemsCollection.doc(id).update(item);
  // }

  // deleteItem(id: string): Promise<void> {
  //   return this.itemsCollection.doc(id).delete();
  // }

}
