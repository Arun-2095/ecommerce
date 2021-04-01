import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { UserDetails } from './../../interface/event';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted ) || form?.form?.errors);
  }
}


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})


export class RegisterComponent implements OnInit {

  constructor(private _userService:UserService , private Route:Router) { }

  ngOnInit(): void {
    // correct 
    
  }

  

  
  checkPasswords (controlName:string, matchControlName:string){

    return (FormGroup:FormGroup) =>{
  
    let pass = FormGroup.controls[controlName].value;
    let confirmPass = FormGroup.controls[matchControlName].value;
    return confirmPass ? pass === confirmPass ? null : { notSame: true } : null
    }
  }

  registerForm = new FormGroup({
    userName:new FormControl('', [Validators.required] ), 
    email: new FormControl('', [Validators.required , Validators.email]),
    password: new FormControl('', [Validators.required ]),
    confirmPassword: new FormControl('', [Validators.required]),
  },
    { 
      validators: this.checkPasswords('confirmPassword', 'password')
    }
 );


  

 
 
 matcher = new MyErrorStateMatcher();

 registerFormSubmit =()=>{

   let userData :UserDetails = this.registerForm.value;

  this._userService.registerUser(userData).subscribe(
    (data)=>{console.log(data, "ABS"); 
       this.Route.navigate(['/auth/login'])  
  })

 }
}
