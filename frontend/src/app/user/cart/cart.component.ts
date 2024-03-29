import { Product } from './../interface/dashboard';
import { DashboardService } from './../dashboard.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartItem } from '../interface/dashboard';
import { Location } from '@angular/common'
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit  {

  constructor(private Location: Location,private DashboardService: DashboardService, private router:Router) { 

  this.DashboardService.cartList.subscribe((cartList)=> {
    console.log(cartList, "CART DATA")
  this.cartItems = cartList.cartItems
this.cartId = cartList.cartId;
})
  }
  

  public cartItems :any =[]

  private cartId: number;
  
  public tableColumns = [
   'Product',
     'Quantity',
      'Price',
      'Selected Product',
      'Total',
      'Action',
  ];
  

  ngOnInit(): void {
    console.log(this.cartItems, "FIRST")

    if(this.cartItems.length == 0){
      this.Location.back()
    }
    //this.DashboardService.getCartItems().subscribe();
//     this.DashboardService.cartList.subscribe((cartList)=> {
//       console.log(cartList, "CART DATA")
//     this.cartItems = cartList.cartItems;
//     // alert(JSON.stringify(cartList.cartItems))
//      this.cartId = cartList.cartId;
//  })
   
  }
 public deleteItem({product_id}) {

this.DashboardService.deleteCartItem([].concat(product_id),this.cartId).subscribe((data)=>{
  if(data) {
    this.DashboardService.getCartItems().subscribe();
  }
})
 }

 getTotalCost() {
  return this.cartItems.map(t => Number(t.price)).reduce((acc, value) => acc + value, 0);
}

placeOrder(){

  this.router.navigate(['/user/order'], {state:{product: this.cartItems,cart_id: this.cartId}})
  console.log(this.cartItems, "TEST")

}

}
