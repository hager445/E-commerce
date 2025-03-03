import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../wishlist/wishlist.service';
import { Iproduct } from '../../../shared/interfaces/producs/iproduct';
import { switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdctslogicService {
  // id:WritableSignal<string[]> = signal([]);
private readonly _CartService = inject(CartService)
private readonly _ToastrService = inject(ToastrService)
private readonly _WishlistService = inject(WishlistService)
  constructor() {}
  addToCartFunc(productId:string):void{
    this._CartService.addToCart({'productId': productId}).subscribe({
      next:(res)=>{
        this._ToastrService.success(res.message);
        this._CartService.cartCount.set(res.numOfCartItems);
      }
     })
    }
  
}
