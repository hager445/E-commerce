import { JwtDecodeOptions } from './../../../../node_modules/jwt-decode/build/cjs/index.d';
import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { jwtDecode } from "jwt-decode";

import { ReactiveFormsModule , Validators} from '@angular/forms';

import {FormControl ,FormGroup} from '@angular/forms';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule , RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
isLoading:boolean =false;
   msgError!:string;
  constructor(private auth:AuthService , private router : Router){}
login:FormGroup = new FormGroup({
email:new FormControl(null , [Validators.required,Validators.email ]),
password:new FormControl(null , [Validators.required , Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),

})

submitForm():void{

  this.isLoading =true;

  // only work when no errors ....//
 if (this.login.valid) {
   this.auth.sendLoginForm(this.login.value).subscribe({
     next:(res)=>{     
      this.isLoading =false;
      if (res.message === 'success') {
        // store token in local storage
        // console.log(res.token);
        localStorage.setItem('userToken' , res.token);
        this.auth.getUserInfo();
        console.log(this.auth.userInfo);
        this.router.navigate(['/home']);
      }
    },
    error:(err:HttpErrorResponse)=>{
      console.log(err);
      this.isLoading = false;
    this.msgError=err.message;
    }
   });
 }
}



}
