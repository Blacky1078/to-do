import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.css'],
})
export class EditTodoComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private message: MessageService
  ) {}

  @Input() RowD: any;
  @Input() visible: boolean = false;
  public formSubmit = 'Submit';
  public email_todoformcontrol!: FormControl;
  public title_todoformcontrol!: FormControl;
  public Desc_todoformcontrol!: FormControl;
  public DateTIme_todoformcontrol!: FormControl;
  public Statusformcontrol!: FormControl;
  public todoForm!: FormGroup;
  public rowData: any;
  public formcancel: any = 'Cancel';

  showDialog() {}

  reloadPage(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    const currentUrl = this.router.url + '?';
    this.router.navigateByUrl(currentUrl).then(() => {
      this.router.navigated = false;
      this.router.navigate([this.router.url]);
    });
  }

  ngOnInit(): void {
    this.email_todoformcontrol = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);

    this.title_todoformcontrol = new FormControl('', [Validators.required]);
    this.Desc_todoformcontrol = new FormControl('', [Validators.required]);
    this.DateTIme_todoformcontrol = new FormControl('', [Validators.required]);
    this.Statusformcontrol = new FormControl('', [Validators.required]);
    this.todoForm = this.fb.group({
      email: this.email_todoformcontrol,
      title: this.title_todoformcontrol,
      desc: this.Desc_todoformcontrol,
      dT: this.DateTIme_todoformcontrol,
      status: this.Statusformcontrol,
    });
  }

  todoEdit() {
    const value = this.todoForm.value;
    console.log(value);
    this.auth.editTODO(value).subscribe((response) => {
      console.log(response);
    });
    this.message.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Edited A To-do Successfully',
    });
    setTimeout(() => {
      this.reloadPage();
      sessionStorage.setItem('selected_todo', JSON.stringify(value));
    }, 1000);
  }

  onclick() {
    this.visible = false;
    sessionStorage.removeItem('selected_todo');
    this.reloadPage();
  }

  value_extractor() {
    this.rowData = sessionStorage.getItem('selected_todo');
    this.email_todoformcontrol.setValue(JSON.parse(this.rowData).email);
    this.title_todoformcontrol.setValue(JSON.parse(this.rowData).title);
    this.Desc_todoformcontrol.setValue(JSON.parse(this.rowData).desc);
    this.DateTIme_todoformcontrol.setValue(JSON.parse(this.rowData).dT);
    this.Statusformcontrol.setValue(JSON.parse(this.rowData).status);
  }
}
