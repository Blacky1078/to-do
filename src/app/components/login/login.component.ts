import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Observable, map } from 'rxjs';
import { User } from 'src/app/interfaces/auth';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[MessageService]
})
export class LoginComponent implements OnInit {

  public loginform!: FormGroup
  public emailformcontrol!: FormControl;
  public passwordformcontrol!: FormControl;
  items$: Observable<User[]> | undefined;
  filteredUsers$: Observable<User[]> | undefined;
  constructor(private fb: FormBuilder,private router: Router,private itemsService: AuthService,private message: MessageService){}

  ngOnInit(): void {
    this.emailformcontrol = new FormControl(null,[Validators.required,Validators.email])
    this.passwordformcontrol = new FormControl(null,[Validators.required,Validators.minLength(6)])

    this.loginform = this.fb.group({
      email: this.emailformcontrol,
      password: this.passwordformcontrol
    }),

    this.items$ = this.itemsService.getUsers();
  }
  get email(){
    return this.loginform.controls['email']
  }
  get password(){
    return this.loginform.controls['password']
  }

  onLogin(){
    const email = this.emailformcontrol.value;
    const password = this.passwordformcontrol.value;
    this.items$ = this.itemsService.getUsers();
    this.items$.subscribe(items => {
      let foundUser = items.find((user)=>{
        return user.email === email && user.password === password
      })
      if(foundUser){
        this.message.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Login Success!!!',
        });
        sessionStorage.setItem('email', email as string);
        sessionStorage.setItem('password',password as string)
        this.router.navigate(['/home'])
      }else{
        this.message.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Credentials Invalid',
        });
      }
    });
  }
  
}
