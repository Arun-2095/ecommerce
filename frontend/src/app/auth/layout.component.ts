import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  template: `
  <div class="d-flex justify-content-center align-items-center h-100">
  <mat-card class="form-layout">
    <router-outlet></router-outlet>
    </mat-card>
  </div>  
  `,
  styles: [`.form-layout{
    width: 360px;
    height: auto;
    border: 2px solid #efefef;
    box-shadow: 2px 10px 10px #efefef;
    padding: 2rem;
}`
  ]
})
export class LayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
