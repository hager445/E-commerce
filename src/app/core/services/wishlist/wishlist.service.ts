import { Iproduct } from './../../../shared/interfaces/producs/iproduct';
import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
    id:WritableSignal<string[]> = signal([]); 
    // heartClicked:WritableSignal<boolean> = signal(false); 
    wishlistCount:WritableSignal<number> = signal(0);
  constructor(private _Http:HttpClient) { 
    this.getLoggedUserWishlist().subscribe({
      next:(res)=>{
        this.wishlistCount.set(res.count);
        res.data.forEach((prod:Iproduct) => {
          this.id.update(ids=>[...ids, prod._id])
        });
      }
    
        })
   
  }
  addProductToWishlist(id:string):Observable<any>{
    return this._Http.post(`${environment.baseUrl}/api/v1/wishlist`,{
      "productId":id ,
    })
  }
  getLoggedUserWishlist():Observable<any>{
    return this._Http.get(`${environment.baseUrl}/api/v1/wishlist`);
  }
  removeProductFromWishlist(id:string):Observable<any>{
    return this._Http.delete(`${environment.baseUrl}/api/v1/wishlist/${id}`);
  }
}
