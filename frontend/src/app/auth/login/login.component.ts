import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { UserCredential } from 'src/app/interface/event';
import { UserService } from './../../service/user.service';



/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit  {

  
  constructor(private UserService:UserService) { }

  ngOnInit(): void {
  }

  loginForm = new FormGroup({
     email: new FormControl('', [Validators.required , Validators.email] ),
     password: new FormControl('', [Validators.required ]),
  });

  matcher = new MyErrorStateMatcher();


  loginSubmit =()=>{

    let loginCredential:UserCredential  = this.loginForm.value
    console.log(this.loginForm, "test")
    this.UserService.loginApiService(loginCredential).subscribe((data) =>{
      console.log(this.loginForm, "test")


    })
    

  }
}
