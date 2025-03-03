import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import {  Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  myToken :string = localStorage.getItem('userToken')!
  cartCount:WritableSignal<number> = signal(0);
  //  cartCount = new BehaviorSubject(0);
  // cartCount$=this.cartCount.asObservable();
  constructor(private http: HttpClient) { 
    this.getLoggedUserCart().subscribe({
      next:(res)=>{
        this.cartCount.set(res.numOfCartItems);
      }
    })
  }
  // handle user cart :
  addToCart(data:object):Observable<any>{
    return this.http.post(`${environment.baseUrl}/api/v1/cart` , data 
    )
  }
  getLoggedUserCart():Observable<any>{

    return this.http.get(`${environment.baseUrl}/api/v1/cart`,
     )
  }
  removeSpecificCartItem(id:string):Observable<any>{
    return this.http.delete(`${environment.baseUrl}/api/v1/cart/${id}`,
    )
  }
  updateCartProductQuantity(newCount:number ,id:string):Observable<any>{
    return this.http.put(`${environment.baseUrl}/api/v1/cart/${id}`,
      

{
      'count':newCount ,
  }
    
    , )
  }
  clearUserCart():Observable<any>{
    return this.http.delete(`${environment.baseUrl}/api/v1/cart`,
      

     )
  }
}
