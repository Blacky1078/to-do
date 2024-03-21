import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { response } from 'express';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app//services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public userEmail = sessionStorage.getItem('email');
  public muserEmail = { email: this.userEmail };

  public username!: string;

  constructor(
    private message: MessageService,
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.auth.getUser(this.muserEmail).subscribe((response) => {
      this.username = response[0].firstname;
    });
    const tt: string | null = sessionStorage.getItem('selected_data')
    console.log(tt)
  }

  logOut() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }


}
