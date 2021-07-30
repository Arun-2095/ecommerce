import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {Router} from "@angular/router"
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest , HttpErrorResponse }from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingInterceptorService implements HttpInterceptor{

  constructor( public toastrService:ToastrService , private router: Router) { }

  private handleError(error: HttpErrorResponse):Observable<HttpEvent<any>> {

  if(error.status === 401) {
     sessionStorage.removeItem('userToken');

     this.router.navigate(['auth/login']);
    return ;
  }else {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
 
       this.toastrService.error(error?.message);
      // return of({error: "An error occurred", status:error.status})
    } else if (error.error instanceof ProgressEvent){ 
    
    this.toastrService.error(error?.statusText);
    
    
  }else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
        this.toastrService.error(error?.error?.message);
     // return of({error: "error", status:error.status})
     return;
    }

    
  }

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let userToken  = sessionStorage.getItem('userToken');

      let tokenHeader = req.clone({
        setHeaders:{
          Authorization:  `Bearer ${userToken}`
        },
        url: environment.userApiEndPoint + req.url
      })

    return next.handle(tokenHeader).pipe(catchError(this.handleError.bind(this)))
  }

  
}
