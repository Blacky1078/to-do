import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { passwordMatchValidator } from '../shared/password-match.directive';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Observable, timeInterval, timeout } from 'rxjs';
import { response } from 'express';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MessageService],
})
export class RegisterComponent implements OnInit {
  public Desc = 'Hello There!!!, Please Fill the Form';
  public buttonTitle = 'Register';
  public isDisabled = false;
  public registerForm!: FormGroup;
  public firstNameFormControl!: FormControl;
  public lastNameFormControl!: FormControl;
  public emailFormControl!: FormControl;
  public passwordFormControl!: FormControl;
  items$: Observable<any[]> | undefined;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private itemsService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.firstNameFormControl = new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]*)*$/),
      Validators.minLength(2),
    ]);

    this.lastNameFormControl = new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/),
      Validators.minLength(3),
    ]);

    this.emailFormControl = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);

    this.passwordFormControl = new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]);

    this.registerForm = this.fb.group({
      firstname: this.firstNameFormControl,
      lastname: this.lastNameFormControl,
      email: this.emailFormControl,
      password: this.passwordFormControl,
    });
  }

  submitform() {
    const userdetails = this.registerForm.value;

    const emailv = { email: userdetails.email };
    console.log(userdetails);

    this.itemsService.getUser(emailv).subscribe((items: any[]) => {
      const foundUser = items.find((user) => {
        return user.email === userdetails.email;
      });
      if (foundUser) {
        alert('Existing User, Redirecting....');
        this.router.navigate(['/login']);
      } else {
        this.itemsService.createUser(userdetails).subscribe((response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Registered!!',
          });
          setTimeout(() => {
            this.router.navigate(['login']);
          }, 2000);
        });
      }
    });
  }
}
