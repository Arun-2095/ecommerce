import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './routing.module';
import { ThemeModule } from './../theme.module';
import { LayoutComponent } from './layout.component';
import { RegisterComponent } from './register/register.component';
import { UserService } from '../service/user.service';


@NgModule({
  declarations: [LoginComponent, LayoutComponent, RegisterComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    ThemeModule
  ],
  providers:[UserService]
})
export class AuthModule { }
