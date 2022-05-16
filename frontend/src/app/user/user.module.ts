import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ThemeModule } from '../theme.module';
import { OrderComponent } from './order/order.component';
import { UserService } from '../service/user.service';
import { DashboardService } from './dashboard.service';
import { CartComponent } from './cart/cart.component';
import { DirectiveModule } from '../directives/directive.module';
import { WeightPipe } from './pipe/weight.pipe';
import { FormControl, FormGroupDirective, NgForm, ReactiveFormsModule } from '@angular/forms';
import { ModuleCommonModule } from '../module-common/module-common.module';
import { ErrorStateMatcher } from '@angular/material/core';
import { OrdersComponent } from './orders/orders.component';
import { TotalPipe } from './pipe/total/total.pipe';


@NgModule({
  declarations: [LayoutComponent, DashboardComponent, OrderComponent, CartComponent, WeightPipe, OrdersComponent, TotalPipe],
  imports: [
    CommonModule,
    UserRoutingModule,
    ThemeModule,
    DirectiveModule,
    ReactiveFormsModule,
    ModuleCommonModule
  ],
  providers: [UserService, DashboardService]
})


export class UserModule { }
