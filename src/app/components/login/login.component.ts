import { Component, OnInit } from '@angular/core';
import {
  EmailValidator,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { Observable, map } from 'rxjs';
import { Reg, log } from 'src/app/interfaces/auth';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  public Desc = 'Welcome back, User!!!';
  public loginform!: FormGroup;
  public titleButton = 'Log In';
  public emailformcontrol!: FormControl;
  public passwordformcontrol!: FormControl;
  items$: Observable<Reg[]> | undefined;
  public username!: string;
  filteredUsers$: Observable<Reg[]> | undefined;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private itemsService: AuthService,
    private message: MessageService
  ) {}

  ngOnInit(): void {
    this.emailformcontrol = new FormControl(null, [
      Validators.required,
      Validators.email,
    ]);
    this.passwordformcontrol = new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]);

    this.loginform = this.fb.group({
      email: this.emailformcontrol,
      password: this.passwordformcontrol,
    });
  }
  get email() {
    return this.loginform.controls['email'];
  }
  get password() {
    return this.loginform.controls['password'];
  }

  onLogin() {
    const emailv = this.emailformcontrol.value;

    const emailj = { email: emailv };

    const password = this.passwordformcontrol.value;
    console.log(emailj);
    this.itemsService.getUser(emailj).subscribe((response) => {
      if (response.length === 0) {
        this.message.add({
          severity: 'error',
          summary: 'Error',
          detail: 'User Does Not Exist',
        });
      } else {
        if (response[0].password == password) {
          this.message.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Login Success!!!',
          });
          sessionStorage.setItem('email', emailv as string);
          sessionStorage.setItem('password', password as string);
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 2000);
        } else {
          this.message.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Invalid Credentials',
          });
        }
      }
    });
  }
}
