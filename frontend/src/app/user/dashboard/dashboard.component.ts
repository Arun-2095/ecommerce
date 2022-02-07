import { Catagory, Product } from './../interface/dashboard';
import { Component, OnInit , OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { MyEvent } from '../../interface/event';
import {DashboardService} from '../dashboard.service';
import {CATAGORY} from "../../helpers/constant"
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit  {
  catagoryList = CATAGORY;
  catagories: Catagory[] ;
  public Loading:boolean = true;
  public SelectedCakePrice:'string';

  constructor(private DashboardService:DashboardService, private router:Router) { 

    this.catagories = [];
  }

  breakPoint : number ;
  layoutBreakPoint:number;

  public productList:any = []

  ngOnInit() {

     this.DashboardService.getProduct().subscribe();

     this.DashboardService.productList.subscribe((data)=> {
         this.productList = data
         this.Loading =false;
     });
     
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
this.productList[index].selectedProductQuantity = value;
this.productList[index].selectedProductPrice = this.productList[index].prices[selectedCakeQuantity] * this.productList[index].selectedProductCount
}

public cupCakeBoxChange($event, index){
  let selectedCakeQuantity = Number(this.productList[index].selectedProductQuantity).toFixed(1);
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
   let requestObj = { catagory :$event.source._value }
   this.DashboardService.setProductFilter(requestObj)
   this.DashboardService.getProduct().subscribe();
  console.log($event.source._value, "SELECTINO")
}

public toAddCart(productId:number){
  console.log(productId, "productId")
  this.DashboardService.addToCart(productId).subscribe((data)=>{
    this.DashboardService.getCartItems().subscribe();
  })
//this.router.navigate(['user/cart']);
}

public takeOrder(product:Product) {
  console.log("takeOrder", product)

  let selectProduct = { ...product, product_quantity: product.selectedProductQuantity , 
           product_price : product.prices[product.selectedProductQuantity] ,
           selected_product: product.selectedProductCount,
           price : product.selectedProductPrice}
  this.router.navigate(['user/order'],{state:{product:[].concat(selectProduct)}});
}
}
