import { Component, OnInit } from '@angular/core';
import { MyEvent } from '../../interface/event';
import { UserService } from './../../service/user.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  catagories: any;

  constructor(private UserService:UserService) { 

    this.catagories = ['Cakes', 'Donuts' , 'Cup Cake']
  }

  breakPoint : number ;
  layoutBreakPoint:number;

  ngOnInit() {

     this.UserService.getUserDetail().subscribe(data =>{

      console.log(data, "DATA DETAILS")
     })
    this.layoutBreakDown();
}

  onResize =(event) =>{
   
    this.layoutBreakDown(event)    
}
  

layoutBreakDown =(event: MyEvent | void) =>{
  let innerWidth = event ? event.target.innerWidth : window.innerWidth
  this.breakPoint = innerWidth < 740 ? 1 : 3;
  this.layoutBreakPoint = innerWidth < 740 ? 1 : 5;
  console.log(this.breakPoint, this.layoutBreakPoint ,innerWidth,  "WIDTH")
}
}
