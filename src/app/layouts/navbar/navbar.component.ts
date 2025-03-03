import { Component, Inject, Input, Signal, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { CartService } from '../../core/services/cart/cart.service';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
readonly _CartService= inject(CartService)
readonly _WishlistService= inject(WishlistService)
readonly auth = inject(AuthService);
numberOfCartItems! : Signal<number>;
wishlistNum! : Signal<number>;
 @Input() logedOut:boolean = false;
 ngOnInit(): void {
 
     this.numberOfCartItems = computed(()=>this._CartService.cartCount());
     this.wishlistNum = computed(()=>this._WishlistService.wishlistCount());
     console.log(this._CartService.cartCount());
     

}
 deleteToken():void{
  if (localStorage.getItem('userToken') !== null) {
       localStorage.removeItem('userToken');
      //  why we need to delete it if the next user will override ?
  this.auth.userInfo = null;
 console.log(this.auth.userInfo);
 
  
  }
 }
}
