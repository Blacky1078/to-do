import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  InitialAuthState,
  Appstore,
  onLogin,
  onLoginAction,
} from '../../../../../redux';
import { isErrorSelector, isSuccessSelector } from '../../../../../redux';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  public isSubmitted!: boolean;

  public userform!: FormGroup;
  public usernameformcontrol!: FormControl;
  public passwordformcontrol!: FormControl;

  public isError$ = this.store.select(isErrorSelector);
  public isSuccess$ = this.store.select(isSuccessSelector);
  public users: any[] = [];
  constructor(
    private fb: FormBuilder,
    private store: Store<Appstore>,
    private db: AngularFirestore
  ) {}
  ngOnInit(): void {
    this.usernameformcontrol = new FormControl(null, [
      Validators.required,
      Validators.email,
    ]);
    this.passwordformcontrol = new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ]);

    this.userform = this.fb.group({
      username: this.usernameformcontrol,
      password: this.passwordformcontrol,
    });
    // this.getUsers();
    this.fetchdata();
    console.log(this.users);

    const usernames: string[] = Object.values(this.users).map(
      (user: any) => user.Username
    );
    const passwords: string[] = Object.values(this.users).map(
      (user: any) => user.Password
    );
    console.log(usernames, passwords);
  }

  onSubmitForm(): void {
    if (this.userform.valid)
      this.store.dispatch(onLoginAction({ ...this.userform.value }));
    else this.store.dispatch(onLoginAction({ ...this.userform.value }));
  }
  resetform() {
    this.userform.reset();
    // this.isError = false;
  }

  fetchdata() {
    this.db
      .collection('Users')
      .valueChanges()
      .subscribe((items: any[]) => {
        this.users = items[0];
        // const keys = this.users.keys
        console.log(this.users);
      });
  }

  // getAllUsers(){
  //   return new Promise<any>((resolve)=>{
  //     this.db.collection('USers').valueChanges({idField: 'id'}).subscribe(users => resolve(users))
  //   })
  // }
  public allUsers: any;
  // async getUsers(){
  //   this.allUsers = await this.getAllUsers();
  //   console.log(this.allUsers);
  // }

  // public Users: any[] = [User1:{
  //   Username: "",
  //   Password:""},
  // User2:{
  // Username: "",
  // Password:""
  // }]
}
