import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.css'],
})
export class CreateTodoComponent implements OnInit {
  public formSubmit = 'Submit';
  visible: boolean = false;
  public todo_id!: any;
  public email_todoformcontrol!: FormControl;
  public title_todoformcontrol!: FormControl;
  public Desc_todoformcontrol!: FormControl;
  public DateTIme_todoformcontrol!: FormControl;
  public Statusformcontrol!: FormControl;
  public todoForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private message: MessageService
  ) {}

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
  showDialog() {
    this.visible = true;
  }

  reloadPage(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    const currentUrl = this.router.url + '?';
    this.router.navigateByUrl(currentUrl).then(() => {
      this.router.navigated = false;
      this.router.navigate([this.router.url]);
    });
  }

  todoSubmit() {
    const value = this.todoForm.value;
    this.auth.createTODO(value).subscribe((response) => {
      console.log(response);
    });
    this.message.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Created A To-Do Successfully, Please Wait...',
    });
    setTimeout(() => {
      this.reloadPage();
      this.reloadPage();
    }, 2000);
  }
}
