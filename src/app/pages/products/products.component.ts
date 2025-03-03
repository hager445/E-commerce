import { Component, inject } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproduct } from '../../shared/interfaces/producs/iproduct';
import { RouterLink } from '@angular/router';
import { NgFor, ViewportScroller } from '@angular/common';
import { TrimPipe } from '../../core/pipes/trim.pipe';
import { ProdctslogicService } from '../../core/services/logic/prodctslogic.service';
import { FavoritebtnComponent } from "../../shared/components/favoritebtn/favoritebtn.component";
import { NgxPaginationModule, PaginatePipe } from 'ngx-pagination';
import { ArrayPipe } from '../../core/pipes/array.pipe';
import { NotintegerPipe } from '../../core/pipes/notinteger.pipe';

@Component({
  selector: 'app-products',
  imports: [RouterLink, TrimPipe, FavoritebtnComponent , NgxPaginationModule, NgFor, ArrayPipe , NotintegerPipe ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
    products:Iproduct[] = [

    ];
    page: number = 1; // رقم الصفحة الحالية
    itemsPerPage: number = 15; // عدد العناصر لكل صفحة
    paginationNum:number = 1;

readonly  _ProdctslogicService = inject(ProdctslogicService);
private readonly _ProductsService = inject(ProductsService);
constructor(private viewportScroller: ViewportScroller){}
ngOnInit(): void {
  
this._ProductsService.getAllProducts().subscribe({
  next:(res)=>{
   this.products = res.data;
  }
}) 

}

addProduct(id:string):void{
  this._ProdctslogicService.addToCartFunc(id)
}

// toastr :
action(event:Event): void {
  event.stopPropagation();
}
onPageChange(event: number) {
  this.page = event;
  this.viewportScroller.scrollToPosition([0, 0]); // تمرير الصفحة للأعلى
}

}
