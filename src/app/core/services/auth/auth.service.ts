import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { jwtDecode } from "jwt-decode";
import { Iuser } from '../../../shared/interfaces/userInfo/iuser';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userInfo:Iuser|null= null ;
  constructor(private http:HttpClient) {}

  sendRegisterForm(data:object):Observable<any>{
return this.http.post(`${environment.baseUrl}/api/v1/auth/signup`, data);
  }
  sendLoginForm(data:object):Observable<any>{
return this.http.post(`${environment.baseUrl}/api/v1/auth/signin`, data);
  }


  getUserInfo():void{
      if (localStorage.getItem('userToken') !== null) {
              this.userInfo = jwtDecode(localStorage.getItem('userToken')! );
              
            }
  }

// handle password :
sendEmail(data:object):Observable<any>{
return this.http.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`,data);
}
verfiyCode(data:object):Observable<any>{
return this.http.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`,data);
}
resetPassword(data:object):Observable<any>{
return this.http.put(`${environment.baseUrl}/api/v1/auth/resetPassword`,data);
}

}
