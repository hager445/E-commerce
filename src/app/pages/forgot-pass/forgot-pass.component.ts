import { Component, inject } from '@angular/core';
import { ReactiveFormsModule , Validators} from '@angular/forms';

import {FormControl ,FormGroup} from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forgot-pass',
  imports: [ReactiveFormsModule],
  templateUrl: './forgot-pass.component.html',
  styleUrl: './forgot-pass.component.scss'
})
export class ForgotPassComponent {
  steps : number = 1 ;
  isLoading:boolean = false;
  private readonly _AuthService =inject(AuthService);
  private readonly _Router =inject(Router);
verifyEmail:FormGroup = new FormGroup({
email:new FormControl(null , [Validators.required , Validators.email ]),


})
sendCode:FormGroup = new FormGroup({
  resetCode:new FormControl(null , [Validators.required , Validators.pattern(/^\w{6}$/)]),
})
updatePass:FormGroup = new FormGroup({
  email:new FormControl(null , [Validators.required , Validators.email ]),
  newPassword:new FormControl(null , [Validators.required ,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
 
})
sendEmail():void{
 let email = this.verifyEmail.get('email')?.value;
 this.updatePass.get('email')?.patchValue(email);
  this.isLoading = true;
  if (this.verifyEmail.valid) {
    this._AuthService.sendEmail(this.verifyEmail.value).subscribe({
      next:(res)=>{
        this.isLoading = false;
   if (res.statusMsg=='success') {
    this.steps = 2
   }
  }
  })
}
}
verifyCode():void{
  this.isLoading = true;
  if (this.sendCode.valid) {
    this._AuthService.verfiyCode(this.sendCode.value).subscribe({
      next:(res)=>{
    this.isLoading = false;
   if (res.status=='Success') {
    this.steps = 3
   }
  }
  })
}
}
verifyNewPass():void{
  this.isLoading = true;
  if (this.updatePass.valid) {
    this._AuthService.resetPassword(this.updatePass.value).subscribe({
      next:(res)=>{
    this.isLoading = false;
    localStorage.setItem('userToken', res.token);
    this._AuthService.getUserInfo();
    this._Router.navigate(['/home']);
  }
  })
}
}

}
