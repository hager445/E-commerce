import { routes } from './../../app.routes';
import { Component } from '@angular/core';
import {AbstractControl, ReactiveFormsModule, ValidationErrors, Validators} from '@angular/forms';
import {FormControl ,FormGroup} from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
// import { Router } from 'express';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [    ReactiveFormsModule  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  msgError:string =''
  isLoading:boolean =false;
  constructor(private auth:AuthService , private router : Router){}
register:FormGroup = new FormGroup({
name:new FormControl(null , [Validators.required , Validators.minLength(3), Validators.maxLength(20)]),
email:new FormControl(null , [Validators.required , Validators.email]),
password:new FormControl(null , [Validators.required , Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
rePassword:new FormControl(null),
phone:new FormControl(null , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)])
} , {validators:this.matchPassword})

submitForm():void{
  console.log(this.register);
  this.isLoading =true;
  // only work when no errors ....//
 if (this.register.valid) {
   console.log('valid');
   
   this.auth.sendRegisterForm(this.register.value).subscribe({
     next:(res)=>{     
      this.isLoading =false;
      if (res.message === 'success') {
        this.router.navigate(['/login']);
      }
      else{
      }
      
    }
    ,
    error:()=> {
  this.msgError = 'Email is already exist';
 
  
}, });
 }
}

matchPassword(group:AbstractControl):ValidationErrors|null{
const password = group.get('password')?.value;
const rePassword = group.get('rePassword')?.value;
return password === rePassword ? null : {misMatch:true};
}

}
