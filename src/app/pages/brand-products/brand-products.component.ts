import { Component, computed, inject, Signal } from '@angular/core';
import { BrandService } from '../../core/services/brand/brand.service';
import { Iproduct } from '../../shared/interfaces/producs/iproduct';
import { ReusableproductsComponent } from '../../shared/components/reusableproducts/reusableproducts.component';
@Component({
  selector: 'app-brand-products',
  imports: [ ReusableproductsComponent],
  templateUrl: './brand-products.component.html',
  styleUrl: './brand-products.component.scss'
})
export class BrandProductsComponent {
private readonly _BrandService = inject(BrandService);
filteredProducts:Signal<Iproduct[]> = computed(()=>this._BrandService.filteredBrand())
products:Iproduct[] = [];
constructor(){}
}
