import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'firebase/compat/firestore'; //
import 'firebase/firestore';
import { Observable, catchError, map, observeOn, throwError } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Reg, log } from './interfaces/auth';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private firestore: AngularFirestore,
    private http: HttpClient,
    private message: MessageService
  ) {}

  getUser(User_email: any): Observable<any> {
    const url = 'http://localhost:3000/user';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http
      .post<any>(url, User_email, httpOptions)
      .pipe(catchError(this.handleError));
  }

  createUser(userData: any): Observable<any> {
    const url = 'http://localhost:3000/createUser'; // Adjust the port number if necessary
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http
      .post<any>(url, userData, httpOptions)
      .pipe(catchError(this.handleError));
  }

  createTODO(userTodo: any): Observable<any> {
    const url = 'http://localhost:3000/createUserTodo'; // Adjust the port number if necessary
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http
      .post<any>(url, userTodo, httpOptions)
      .pipe(catchError(this.handleError));
  }

  getTODO(User_email: any) {
    const url = 'http://localhost:3000/userTodo';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http
      .post<any>(url, User_email, httpOptions)
      .pipe(catchError(this.handleError));
  }
  editTODO(User_todo: any) {
    const url = 'http://localhost:3000/EditUserTodo';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http
      .post<any>(url, User_todo, httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {  //Net Generated
    let errorMessage = 'Unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    alert('Backend Server Error ---->  ' + errorMessage);
    return throwError(errorMessage);
  }

//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
}