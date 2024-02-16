import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router,private auth: AuthService) {}

  ngOnInit(): void {
    // this.print();
  }

  logOut() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

  // print(){
  //   this.auth.getItems().subscribe(
  //     response => {
  //       console.log(response)
  //     },
  //     error => {
  //       console.log(error)
  //     }
  //   )
  // }
  
}
