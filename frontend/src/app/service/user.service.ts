import { UserCredential, UserDetails} from './../interface/event';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable  } from 'rxjs';
import {Endpoints} from "src/app/helpers/endpoints"

@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  constructor(private http: HttpClient) {}
  
  public userToken = sessionStorage.getItem('userToken');

  loginApiService(data:UserCredential): Observable<any> {
    return this.http.post(Endpoints.LOGIN, data)
  }

  registerUser(data:UserDetails): Observable<any> {
    return this.http.post(Endpoints.REGISTER, data)
  }


  getUserDetail():Observable<any> {
    return this.http.get(Endpoints.GET_USER_DETAIL)
  }
}
