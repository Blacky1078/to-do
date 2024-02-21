import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public todo: FormGroup = this.fb.group({
    todolist: new FormArray([]),
  });

  constructor(private fb:FormBuilder ,private router: Router,private auth: AuthService) {}

  ngOnInit(): void {}
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
    const todoArray = this.todo.get('todolist') as FormArray;

    const TodoArray = [];

    for (let i = 0; i < todoArray.length; i++) {
      const todogroup = todoArray.at(i) as FormGroup;

      const todoitem = todogroup.get('item')?.value;

      TodoArray?.push(todoitem);
    }

    const TodoJson = JSON.stringify(TodoArray);
    
  }

  logOut() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }


  
}
