import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ThemeModule } from '../theme.module';
import { OrderComponent } from './order/order.component';
import { UserService } from '../service/user.service';

@NgModule({
  declarations: [LayoutComponent, DashboardComponent, OrderComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ThemeModule
  ],
  providers:[UserService]
})


export class UserModule { }
