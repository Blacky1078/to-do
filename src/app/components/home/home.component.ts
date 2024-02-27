import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { response } from 'express';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public userEmail = sessionStorage.getItem('email');
  public muserEmail = { email: this.userEmail };
  public todo: FormGroup = this.fb.group({
    todolist: new FormArray([]),
  });
  
  constructor(
    private message: MessageService,
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.onlogin();
  }
  get TODOitemsArray(): FormArray {
    return this.todo.get('todolist') as FormArray;
  }

  public todoFields(): FormGroup {
    return this.fb.group({
      item: [''],
    });
  }

  public onAddTODOitems() {
    this.TODOitemsArray.push(this.todoFields());
  }

  public removeItem(i: number) {
    this.TODOitemsArray.removeAt(i);
  }

  onSSubmit() {
    const userTODOitems: any[] = this.TODOitemsArray.value;

    const UT = {
      email: this.userEmail,
      todo: userTODOitems,
    };
    console.log(UT);

    this.auth.createTODO(UT).subscribe((response) => {
      this.message.add({
        severity: 'success',
        summary: 'Success',
        detail: 'To-Do Items Updated',
      });
      console.log(response);
    });

    // const todoArray = this.todo.get('todolist') as FormArray;

    // const TodoArray = [];

    // for (let i = 0; i < todoArray.length; i++) {
    //   const todogroup = todoArray.at(i) as FormGroup;

    //   const todoitem = todogroup.get('item')?.value;

    //   TodoArray?.push(todoitem);
    // }

    // const TodoJson = JSON.stringify(TodoArray);
  }

  logOut() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

  onlogin() {
    this.auth.getTODO(this.muserEmail).subscribe((response) => {
      console.log(response);
      for (let i = 0; i <= response.length; i++) {
        const items = response[0].todo;

        const ite = Object.values(items);

        console.log(items);

        const formgp = this.fb.group({
          item: items,
        });

        this.TODOitemsArray.push(formgp);
      }
    });
  }
}
