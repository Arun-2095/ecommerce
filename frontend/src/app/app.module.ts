import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ThemeModule } from './theme.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {ErrorHandlingInterceptorService} from '../app/service/error-handling-interceptor.service'
import { ToastrModule } from 'ngx-toastr';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NoopAnimationsModule,
    ThemeModule,
    AppRoutingModule,
    ToastrModule.forRoot()
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass:ErrorHandlingInterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent] 
})
export class AppModule { }
