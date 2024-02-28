import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
// import {MatIconModule} from '@angular/material/icon'


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    public isUserLoggedIn!: boolean;
    @Input() username!: string;
    


  constructor(private router: Router){}
  ngOnInit() {

     const userDetails = sessionStorage.getItem('email');

     if(userDetails == null || userDetails == ''){
        this.isUserLoggedIn = false
     }else{
        this.isUserLoggedIn = true
     }
  }
  logOut() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }



}


