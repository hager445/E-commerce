import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproduct } from '../../shared/interfaces/producs/iproduct';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Icategory } from '../../shared/interfaces/icategory';
import { TrimPipe } from '../../core/pipes/trim.pipe';
import { ProdctslogicService } from '../../core/services/logic/prodctslogic.service';
import { ReusableproductsComponent } from '../../shared/components/reusableproducts/reusableproducts.component';

@Component({
  selector: 'app-categories',
  imports: [ReusableproductsComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  products:Iproduct[]=[]
  filtered:Iproduct[]=[]
  catgoryId!:string;
  catgory:Icategory ={}as Icategory;

  private readonly _ProdctslogicService = inject(ProdctslogicService);
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _CategoriesService = inject(CategoriesService);
  private readonly _ProductsService = inject(ProductsService);
ngOnInit(): void {
  // get all products:
  this._ProductsService.getAllProducts().subscribe({
next:(res)=>{
  this.products = res.data;
  this.filtered = this.products.filter((product:Iproduct)=> {
   return product.category.name === this.catgory.name
  }); 
}
  })
//  get product id :
  this._ActivatedRoute.paramMap.subscribe({
    next:(param)=>{
     this.catgoryId = param.get('id')!;
    
     this._CategoriesService.getAllSpecificCategory(this.catgoryId).subscribe({
      next:(res)=>{
    
       this.catgory = res.data;
   
      }
     })
    }
  })
}



addProduct(id:string):void{
  this._ProdctslogicService.addToCartFunc(id);
}

  // wishlist ...

  
  
  // toastr :
  action(event:Event): void {
    event.stopPropagation();
  }
}
