import { DashboardService } from './../dashboard.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from './../../service/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styles: [`.content-layout{
    width: 100%;
    height: 90vh;
}

.sidenav{
    width: 15%; 
}
@media (max-width: 765px){

  .sidenav{
    width: 100%; 
}

}
`

  ]
})
export class LayoutComponent implements OnInit {

  constructor(private UserService:UserService, private DashboardService: DashboardService, 
    private router:Router) { }
  public links:string[] = ['Dashboard', 'Orders', 'Cart', 'Account', 'Notification']

  public cartItems:number;

  ngOnInit(): void {
    this.UserService.getUserDetail().subscribe(data =>{
      console.log(this.UserService.getUserDetails,"DATA DETAILS")
     })

     this.DashboardService.getCartItems().subscribe();

     this.DashboardService.cartList.subscribe((cartList)=> {
     this.cartItems = cartList.cartItems.length;
     })
      
  }

 public redirectToCart():void {
  this.router.navigate(['user/cart']);
 }

 public logout():void {
   
  window.sessionStorage.removeItem('userToken');
  this.router.navigate(['auth/login']);

 }
}
