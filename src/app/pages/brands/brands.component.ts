import { Component, inject } from '@angular/core';
import { BrandService } from '../../core/services/brand/brand.service';
import { Ibrand } from '../../shared/interfaces/brand/ibrand';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductsService } from '../../core/services/products/products.service';

import { Iproduct } from '../../shared/interfaces/producs/iproduct';
import { Router } from '@angular/router';


@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {
  private readonly _BrandService= inject(BrandService);
  private readonly _ProductsService= inject(ProductsService);
    private readonly _NgxSpinnerService= inject(NgxSpinnerService);
    private readonly _Router= inject(Router);
  
  brands:Ibrand[]=[];
  loadMore:number=1;
  noMoreStatement!:string;
getBrandProducts(name:string):void{
this._ProductsService.getAllProducts().subscribe({
  next:(res)=>{
   this._BrandService.filteredBrand.set(res.data.filter(((product:Iproduct)=> product.brand.name === name)))
   this._Router.navigate(['/brand-products']);
  
   
  }
})
  }
ngOnInit(): void {

  this._BrandService.getAllBrands().subscribe({
    next:(res)=>{
        
    this.brands = res.data;
    }
  })
}
getSpecificBrand(id:string){
  this._BrandService.getSpecificBrand(id).subscribe({
    next:(res)=>{
      console.log(res.data.name);
      this.getBrandProducts(res.data.name);
      // this._Router.navigate(['/brand-products']);
    }
  })
}
showMore(): void {
  // optimized ;
  const maxItems = this.loadMore * 8;

  if (maxItems >= this.brands.length) {
    this.noMoreStatement = 'No More Brands To Show!';
    return; 
  }

  this._NgxSpinnerService.show();

  setTimeout(() => {
    this._NgxSpinnerService.hide();
    this.loadMore++;
  }, 2000);
}

}
