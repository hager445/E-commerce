import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  myToken :string = localStorage.getItem('userToken')!

  constructor(private _Http:HttpClient) { }
  createCashOrder(data:object , id:string):Observable<any>{
return this._Http.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,{
  "shippingAddress":data
},
{

  headers:{
    token:this.myToken,

  }
}


)
  }
}
