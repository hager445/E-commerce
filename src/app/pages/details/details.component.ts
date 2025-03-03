import { Component, inject, Signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproduct } from '../../shared/interfaces/producs/iproduct';
import { FavoritebtnComponent } from '../../shared/components/favoritebtn/favoritebtn.component';
import { AddtocartComponent } from "../../shared/components/addtocart/addtocart.component";
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Icart } from '../../shared/interfaces/cart/icart';

@Component({
  selector: 'app-details',
  imports: [FavoritebtnComponent, AddtocartComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  product: Iproduct = {} as Iproduct;
  productId!:string;
  productCount:number = 1;
  imageClickedSrc:string | null =null;

  
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);
ngOnInit(): void {
  this._CartService.getLoggedUserCart().subscribe({
    next:(res)=>{
      res.data.products.forEach((product:Icart) => {
        if (product.product._id === this.productId) {
          this.productCount = product.count;
        }
      });
    }
  })
//  get product id :
  this._ActivatedRoute.paramMap.subscribe({
    next:(param)=>{
     this.productId = param.get('id')!;
     console.log(this.productId);
     this._ProductsService.getSpecificProduct(this.productId).subscribe({
      next:(res)=>{
    console.log(res.data);
    this.product = res.data;
    
      }
     })
    }
  })
}
changeMainImgSource(smallImgSrc:string){
    this.imageClickedSrc = smallImgSrc;
}

// ===== ====== ============ 
updateCount(count:number , id:string):void{

  this._CartService.updateCartProductQuantity(count , id).subscribe({
    next:(res)=>{
      this.productCount = count;
      if (res.status == 'success') {
        
        if (count < 1) {
          this._ToastrService.error('This Item has been Deleted!');
        }
      }
     
      
    }
  })
  }
}
