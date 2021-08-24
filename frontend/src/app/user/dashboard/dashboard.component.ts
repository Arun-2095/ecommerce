import { Catagory } from './../interface/dashboard';
import { Component, OnInit } from '@angular/core';
import { MyEvent } from '../../interface/event';
import {DashboardService} from '../dashboard.service';
import {CATAGORY} from "../../helpers/constant"
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  catagoryList = CATAGORY;
  catagories: Catagory[] ;
  public SelectedCakePrice:'string';

  constructor(private DashboardService:DashboardService) { 

    this.catagories = [];
  }

  breakPoint : number ;
  layoutBreakPoint:number;

  public productList:any = []

  ngOnInit() {

     this.DashboardService.getProduct().subscribe(data =>{
      
      console.log(data, "data")
      this.productList = data
     })

     this.DashboardService.getCatagory().subscribe(data =>{

      this.catagories = data;
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

public onQuantityChange({value}, index){
let selectedCakeQuantity = Number(value).toFixed(1);
this.productList[index].selectedProduct = value;
this.productList[index].selectedProductPrice = this.productList[index].prices[selectedCakeQuantity]
}

public cupCakeBoxChange($event, index){
  let selectedCakeQuantity = Number(this.productList[index].quantities[0]).toFixed(1);
 
  let userValue = $event.target.value;
  
  if(userValue < 0 || !userValue) {  
    this.productList[index].selectedProductCount = 1;
    this.productList[index].selectedProductPrice = this.productList[index].prices[selectedCakeQuantity]
  }else{
    this.productList[index].selectedProductCount = userValue ;
    this.productList[index].selectedProductPrice = this.productList[index].prices[selectedCakeQuantity] * userValue
  }
}

public onCatagorySelection($event){

  console.log($event.source._value, "SELECTINO")
}
}
