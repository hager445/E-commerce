import { Component, inject, Inject } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { Iproduct } from '../../shared/interfaces/producs/iproduct';
// import { RouterLink } from '@angular/router';
// import { TrimPipe } from '../../core/pipes/trim.pipe';
import { ProdctslogicService } from '../../core/services/logic/prodctslogic.service';
// import { CurrencyPipe } from '@angular/common';
import { ReusableproductsComponent } from '../../shared/components/reusableproducts/reusableproducts.component';



@Component({
  selector: 'app-wishlist',
  imports: [ReusableproductsComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent {
  fromWishlist:boolean =true;
readonly _WishlistService =inject(WishlistService)
readonly _ProdctslogicService =inject(ProdctslogicService)
constructor(){}
wishlists:Iproduct[]=[]

getWishlist():void{

  this._WishlistService.getLoggedUserWishlist().subscribe({
    next:(res)=>{
      this._WishlistService.wishlistCount.set(res.count)
      this.wishlists = res.data;
    }
  })
  
}
  ngOnInit(): void {
    this.getWishlist();
  }
  
  addProduct(id:string):void{
this._ProdctslogicService.addToCartFunc(id);

  }
}
