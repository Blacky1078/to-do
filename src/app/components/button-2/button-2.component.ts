import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-2',
  templateUrl: './button-2.component.html',
  styleUrls: ['./button-2.component.css']
})
export class Button2Component {
  @Input() label!: string;
}
