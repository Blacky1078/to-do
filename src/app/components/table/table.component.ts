import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Column, createtodo } from 'src/app/interfaces/auth';
import { AuthService } from 'src/app/services/auth.service';
import { Route, Router } from '@angular/router';
import { EditTodoComponent } from '../edit-todo/edit-todo.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  public products!: createtodo[];
  public selectedProduct!: createtodo;
  public emailv = sessionStorage.getItem('email');
  public data: any[] = [];
  public cols!: Column[];
  public clonedproducts: { [s: string]: createtodo } = {};
  public visible!: boolean;
  public da!: any;
  @Input() showEdit: any = false;
  @ViewChild(EditTodoComponent) childcomponent!: EditTodoComponent;

  // public column! : cols[];

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    const user = { email: this.emailv };
    this.auth.getTODO(user).subscribe((response) => {
      for (let i = 0; i < response.length; i++) {
        this.data.push(response[i]);
      }
      this.products = this.data;
    });
    this.cols = [
      { field: 'id', header: 'To-Do ID' },
      { field: 'title', header: 'Title' },
      { field: 'desc', header: 'Description' },
      { field: 'dT', header: 'Date N Time' },
      { field: 'status', header: 'Status' },
    ];
  }

  onrow(event: any) {
    this.da = event.data;
    const dd = JSON.stringify(this.da);
    sessionStorage.setItem('selected_todo', dd);
    this.childcomponent.value_extractor();
    setTimeout(() => {
      this.show();
    }, 0);
  }

  show() {
    if (
      sessionStorage.getItem('selected_todo') === null ||
      sessionStorage.getItem('selected_todo') === '' ||
      sessionStorage.getItem('selected_todo') == undefined
    ) {
    } else {
      this.showEdit = true;
    }
  }
}
