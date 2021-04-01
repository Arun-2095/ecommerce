import { UserCredential, UserDetails} from './../interface/event';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError  } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  constructor(private http: HttpClient) { }


  loginApiService(data:UserCredential): Observable<any> {
    return this.http.post(`${environment.userApiEndPoint}/login`, data)
  }

  registerUser(data:UserDetails): Observable<any> {
    return this.http.post(`${environment.userApiEndPoint}/register`, data)
  }
}
