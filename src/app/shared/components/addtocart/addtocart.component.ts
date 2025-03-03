import { Iproduct } from './../../interfaces/producs/iproduct';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ProdctslogicService } from '../../../core/services/logic/prodctslogic.service';
import { switchMap, tap } from 'rxjs';
import { WishlistService } from '../../../core/services/wishlist/wishlist.service';


@Component({
  selector: 'app-addtocart',
  imports: [],
  templateUrl: './addtocart.component.html',
  styleUrl: './addtocart.component.scss'
})
export class AddtocartComponent {
showHeart:boolean=true;
added:boolean = false;
@Input() fromWishlist! : boolean ;
@Input() fromProductDetails! : boolean ;
@Output() products = new EventEmitter<Iproduct[]>()

@Input()productId!:string;
private readonly _ProdctslogicService = inject(ProdctslogicService)
private readonly _WishlistService = inject(WishlistService)


addProduct(id:string){
  this._ProdctslogicService.addToCartFunc(id);
   this.added=true;
  if (this.fromWishlist) {
   
    
    this.showHeart=false
    this._WishlistService.removeProductFromWishlist(id)
      .pipe(
        tap(()=>{this._WishlistService.id.update(ids => ids.filter(oldId => oldId !== id))}),
        switchMap(() => this._WishlistService.getLoggedUserWishlist()), // Ensures sequential execution
        tap((res) => {
          this._WishlistService.wishlistCount.set(res.count);
          this.products.emit(res.data);
        })
      )
      .subscribe();
  }else{
    this.showHeart = true
  }

  
}
action(event:Event){
  event.stopPropagation();

}
}
