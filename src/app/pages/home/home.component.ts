
import { Component, inject } from '@angular/core';
import { CarouselModule,OwlOptions } from 'ngx-owl-carousel-o';
import { ProductsService } from '../../core/services/products/products.service';
import{Iproduct} from '../../shared/interfaces/producs/iproduct'
import { Icategory } from '../../shared/interfaces/icategory';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { FavoritebtnComponent } from "../../shared/components/favoritebtn/favoritebtn.component";
import { AddtocartComponent } from "../../shared/components/addtocart/addtocart.component";
import { ArrayPipe } from '../../core/pipes/array.pipe';
import { NotintegerPipe } from '../../core/pipes/notinteger.pipe';
import { RatingstarsComponent } from "../../shared/components/ratingstars/ratingstars.component";

@Component({
  selector: 'app-home',
  imports: [CarouselModule, RouterLink, FavoritebtnComponent, AddtocartComponent, ArrayPipe, NotintegerPipe, RatingstarsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private readonly _CartService = inject(CartService);
  private readonly _WishlistService = inject(WishlistService);

  images:string[]=['/imgs/catecories/71RdoeXxtrL 1.png',
    '/imgs/catecories/698717_Z8A1X_3475_001_100_0000_Light-Reversible-quilted-satin-jacket 1.png',
    '/imgs/catecories/Copa_Sense 1.png' ,
    '/imgs/catecories/eos-250d-03-500x500 1.png',
    '/imgs/catecories/GP11_PRD3 1.png',
    '/imgs/catecories/ideapad-gaming-3i-01-500x500 1.png',
    '/imgs/catecories/New-Mercedes-Benz-Gtr-Licensed-Ride-on-Car-Kids-Electric-Toy-Car 1.png',
    '/imgs/catecories/sam-moghadam-khamseh-kvmdsTrGOBM-unsplash 1.png',
    '/imgs/catecories/sam-moghadam-khamseh-L_7MQsHl_aU-unsplash 1.png',
    '/imgs/catecories/1678303526206-cover-removebg-preview.png'
  ]
  products:Iproduct[] = [];
  categories:Icategory[] = [];
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CategoriesService = inject(CategoriesService);
  private readonly _Router = inject(Router);
  constructor(private _ToastrService: ToastrService){}
// change pics:
changeImages(i:number):string{
  return this.categories[i].image ? this.images[i] : this.categories[i].image;
}
ngOnInit(): void {
this._ProductsService.getAllProducts().subscribe({
  next: (res)=>{
    console.log(res.data);
    this.products = res.data;
  }
})
this._CategoriesService.getAllCategories().subscribe({
  next: (res)=>{
    console.log(res.data);
    this.categories = res.data;
  }
})
}
addToCartFunc(productId:string):void{

this._CartService.addToCart({'productId': productId}).subscribe({
  next:(res)=>{
    console.log(res);
    this._ToastrService.success(res.message);
    this._CartService.cartCount.set(res.numOfCartItems);
  }
 })
}
// wishlist ...
addToWishlist(id:string ):void{
this._WishlistService.addProductToWishlist(id).subscribe({
  next:(res)=>{
  
  if (res.status === 'success') {
    
    this._ToastrService.success(res.message);
    this._WishlistService.getLoggedUserWishlist().subscribe({
      next:(res )=>{
      this._WishlistService.wishlistCount.set(res.count);
      }
    })
  }
  }
})
}

// handle static carsoul .... ;
customOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: true,
  dots: true,
  navSpeed: 700,
  items:1,
  nav: false,
  autoplay:true,
  autoplayTimeout:3000,
  autoplayHoverPause:true,
}
// handle dynamic carsoul :
customCategoryOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: true,
  dots: true,
  autoplay:true,
  autoplayTimeout:3000,
  autoplayHoverPause:true,
  navSpeed: 700,
  responsive: {
    0: {
      items: 1
    },
    300:{items:2},
    600: {
      items: 3
    },
    740: {
      items: 4
    },
    940: {
      items: 5
    }
  },
  nav: false
}
// toastr :
action(event:Event): void {
  event.stopPropagation();
}
}
