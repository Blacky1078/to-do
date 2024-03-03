import { Component, OnInit } from '@angular/core';
import { Column, createtodo } from 'src/app/interfaces/auth';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  public products!: createtodo[];
  public emailv = sessionStorage.getItem('email');
  public data: any[] = []
  public cols!: Column[];

  // public column! : cols[];

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    const user = { email: this.emailv };
    this.auth.getTODO(user).subscribe((response) => {
      for (let i=0;i<response.length;i++){
        this.data.push(response[i])
      }
      console.log(response[1]);
      console.log(this.data);
      this.products = this.data
      console.log(this.products)
      
      
    });
    this.cols = [
      { field: 'email', header: 'Email' },
      { field: 'title', header: 'Title' },
      { field: 'desc', header: 'Description' },
      { field: 'dT', header: 'Date N Time' },
      { field: 'status', header: 'Status' }
    ];

  }
}

