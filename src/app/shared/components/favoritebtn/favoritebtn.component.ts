import { Component, computed, effect, inject, Input, Signal } from '@angular/core';
import { ProdctslogicService } from '../../../core/services/logic/prodctslogic.service';
import { WishlistService } from '../../../core/services/wishlist/wishlist.service';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-favoritebtn',
  imports: [],
  templateUrl: './favoritebtn.component.html',
  styleUrl: './favoritebtn.component.scss'
})
export class FavoritebtnComponent {
 @Input() productId!:string;
 id:Signal<string[]> = computed(()=>this._WishlistService.id())

readonly _ProdctslogicService = inject(ProdctslogicService);
private readonly _WishlistService = inject(WishlistService);
constructor(){
 
  
}

addToWishlist(id:string,event:Event ):void{
  this._WishlistService.addProductToWishlist(id).pipe(
    tap(()=>{this._WishlistService.id.update(ids=>[...ids, id]);
      this.checkBtnState(event,id);
    }),
    switchMap(()=> this._WishlistService.getLoggedUserWishlist()),
    tap((res)=>{
     
      this._WishlistService.wishlistCount.set(res.count);
    
    }),
  
  
  ).subscribe()

  
  }
action(event:Event):void{
  event.stopPropagation();

}
checkBtnState(event:Event , id:string){
 const  i = event.target as HTMLElement;
if(i?.classList.contains('text-mainColor')){
  this._WishlistService.removeProductFromWishlist(id).pipe(
        tap(()=>{this._WishlistService.id.update(ids => ids.filter(oldId => oldId !== id));
     }),
    switchMap(()=> this._WishlistService.getLoggedUserWishlist()
  ),tap((res)=>{   this._WishlistService.wishlistCount.set(res.count)})
  ).subscribe()
}


}
}
