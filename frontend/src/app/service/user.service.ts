import { UserCredential, UserDetails, userAddress } from './../interface/event';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Endpoints } from "src/app/helpers/endpoints"
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) { }

  public userToken = sessionStorage.getItem('userToken');

  protected userDetails: any = {}

  loginApiService(data: UserCredential): Observable<any> {
    return this.http.post(Endpoints.LOGIN, data)
  }

  registerUser(data: UserDetails): Observable<any> {
    return this.http.post(Endpoints.REGISTER, data)
  }


  getUserDetails() {
    return this.getUserDetails
  }

  getUserDetail(): Observable<any> {
    return this.http.get(Endpoints.GET_USER_DETAIL).pipe((

      map((response) => {

        this.userDetails = response;

        return response

      })

    ))
  }

}
