import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import {RouterGuardGuard} from './router-guard.guard'
const routes: Routes = [{
  path:'',
  component: LayoutComponent,
  canActivate: [RouterGuardGuard],
  children:[ 
    {
    path: 'dashboard',
    component: DashboardComponent,
   },
   {
    path: 'order',
    component: OrderComponent,
   },
   {
    path: 'cart',
    component: CartComponent,
   }
  ]
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class UserRoutingModule { }
