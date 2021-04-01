import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest , HttpErrorResponse }from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingInterceptorService implements HttpInterceptor{

  constructor( public toastrService:ToastrService ) { }

  private handleError(error: HttpErrorResponse):Observable<HttpEvent<any>> {

    console.log(error, "error Interceptor")
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
 
       this.toastrService.error(error?.message);
      // return of({error: "An error occurred", status:error.status})
    } else if (error.error instanceof ProgressEvent){ 
    
    this.toastrService.error(error?.statusText);
    
    
  }else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.log(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
        
        this.toastrService.error(error?.error?.message);
     // return of({error: "error", status:error.status})
    }
    // Return an observable with a user-facing error message.
    
    return throwError('Something went Wrong')
    
    
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
    return next.handle(req).pipe(catchError(this.handleError.bind(this)))
  }

  
}
