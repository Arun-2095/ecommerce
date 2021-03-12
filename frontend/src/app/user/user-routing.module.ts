import { OrderComponent } from './order/order.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [{
  path:'',
  component: LayoutComponent,
  children:[ 
    {
    path: 'dashboard',
    component: DashboardComponent,
   },
   {
    path: 'orders',
    component: OrderComponent,
   }
  ]
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class UserRoutingModule { }
