import { Component, Input, OnInit } from '@angular/core';
import { FormControl, } from '@angular/forms';




@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {

  @Input('label') label: string;

  @Input('name') name: string;

  @Input('type') type: string = "text";

  @Input('component') component: string = "input";


  @Input('control') control: FormControl;

  constructor() { }

  ngOnInit(): void { }





}
