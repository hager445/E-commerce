
import { Component,  Input } from '@angular/core';
import { Iproduct } from '../../interfaces/producs/iproduct';
import { TrimPipe } from '../../../core/pipes/trim.pipe';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FavoritebtnComponent } from '../favoritebtn/favoritebtn.component';
import { AddtocartComponent } from "../addtocart/addtocart.component";

@Component({
  selector: 'app-reusableproducts',
  imports: [TrimPipe, CurrencyPipe, RouterLink, FavoritebtnComponent, AddtocartComponent],
  templateUrl: './reusableproducts.component.html',
  styleUrl: './reusableproducts.component.scss'
})
export class ReusableproductsComponent {
@Input() showHeart!:boolean
@Input() products : Iproduct[]=[]
@Input() fromWishlist! : boolean ;

constructor(){}
updateProducts(updatedProducts: Iproduct[]) {
  this.products = updatedProducts; 
}


action(e:Event):void{
e.stopPropagation();
}
}
