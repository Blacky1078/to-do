import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { passwordMatchValidator } from '../shared/password-match.directive';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Observable, timeInterval } from 'rxjs';
import { response } from 'express';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MessageService],
})
export class RegisterComponent implements OnInit {
  public registerForm!: FormGroup;
  public firstNameFormControl!: FormControl;
  public lastNameFormControl!: FormControl;
  public emailFormControl!: FormControl;
  public passwordFormControl!: FormControl;
  public repasswordFormControl!: FormControl;
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

    this.repasswordFormControl = new FormControl('', [Validators.required]);

    this.registerForm = this.fb.group(
      {
        firstname: this.firstNameFormControl,
        lastname: this.lastNameFormControl,
        email: this.emailFormControl,
        password: this.passwordFormControl,
        rePassword: this.repasswordFormControl,
      },
      {
        validators: passwordMatchValidator,
      }
    );
  }

  submitform() {
    const userdetails = this.registerForm.value;
    delete userdetails.rePassword;

    const emailv = {email: userdetails.email}

    this.itemsService.getUser(emailv).subscribe((items: any[]) => {
      const foundUser = items.find((user)=>{
      return  user.email === userdetails.email 
      })
      if(foundUser){
        alert("Existing User, Redirecting....")
        this.router.navigate(['/login']); 
      } else
      {
        this.itemsService.createUser(userdetails).subscribe(
          response =>{
            alert("Thanks for Registration!!!")
            this.messageService.add({severity: 'success', summary: 'Success', detail: 'Registered!!' });
            this.router.navigate(['login']);
            
          }
        );
      }
    });
  }
}
