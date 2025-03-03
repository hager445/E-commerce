import { Component, ElementRef, inject, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { Icart } from '../../shared/interfaces/cart/icart';
import { TrimPipe } from '../../core/pipes/trim.pipe';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-cart',
  imports: [TrimPipe , CurrencyPipe , DecimalPipe , RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

  @ViewChildren('icon') icons!: QueryList<ElementRef>; 

  selectedId :string = '';
  upIsClicked:boolean = false;
  downIsClicked:boolean = false;
  cartId!:string;
  cartProducts:Icart[]= []
   readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);
getUserCart():void{
    this._CartService.getLoggedUserCart().subscribe({
      next:(res)=>{
        this.cartId = res.data._id;   
        this.cartProducts = res.data.products;   
        this._CartService.cartCount.set(res.numOfCartItems);
         console.log(this.cartProducts);
         
        
      }
    })
  }
ngOnInit(): void {
  this.getUserCart();
}
deleteItem(id:string):void{
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      title: "text-lg font-medium text-nowrap my-3 text-gray-800", // Title styling
       popup: " py-10",
       icon:"mt-0",
      confirmButton: "text-white border-none outline-none py-3 px-7 bg-sky-500 mx-5 hover:bg-sky-400 transition-effect",
      cancelButton: "text-white border-none outline-none py-3 px-7 bg-red-600 mx-5 hover:bg-red-500 transition-effect"
    },
    buttonsStyling: false
  });
  swalWithBootstrapButtons.fire({
    title: "Do You Want to Delete This Item ?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!",
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      this._CartService.removeSpecificCartItem(id).subscribe({
        next:()=>{
          this.getUserCart()
          this._ToastrService.error('This Item has been Deleted!')
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your Item has been deleted.",
            icon: "success"
          });
        }
      });
     
    } else if (
 
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire({
        title: "Cancelled",
        text: "You Keep This Item in Your Cart ! :)",
        icon: "error"
      });
    }
  });
  



}
updateCount(count:number , id:string):void{
this._CartService.updateCartProductQuantity(count , id).subscribe({
  next:(res)=>{
    this.getUserCart();
    if (res.status == 'success') {
      
      if (count < 1) {
        this._ToastrService.error('This Item has been Deleted!');
      }
    }
   
    
  }
})
}
clearCartFunc():void{
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      title: "text-lg font-medium text-nowrap my-3 text-gray-800", // Title styling
       popup: " py-10",
       icon:"mt-0",
      confirmButton: "text-white border-none outline-none py-3 px-7 bg-sky-500 mx-5 hover:bg-sky-400 transition-effect",
      cancelButton: "text-white border-none outline-none py-3 px-7 bg-red-600 mx-5 hover:bg-red-500 transition-effect"
    },
    buttonsStyling: false
  });
  swalWithBootstrapButtons.fire({
    title: "Do You Want to Clear Your Cart ?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, Clear it!",
    cancelButtonText: "No, cancel!",
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      this._CartService.clearUserCart().subscribe({
    
        next:(res)=>{
         if (res.message == 'success') {
          this.getUserCart()
          this._ToastrService.info('Your Cart Is Empty!')
          swalWithBootstrapButtons.fire({
            title: "Done!",
            text: "Your Cart has been Cleared.",
            icon: "success"
          });
         }
        }
      })
    } else if (
 
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire({
        title: "Cancelled",
        text: " Your Cart is Saved as Same! :)",
        icon: "error"
      });
    }
  });
 
}
setColored(e:Event){
  this.icons.forEach(icon => {
    icon.nativeElement.classList.remove('text-mainColor');
  });
  const ele = e.target as HTMLElement;
  if ( ele.classList.contains('icon')) {
    
    ele.classList.add('text-mainColor');
  }
  
  
  
}
}
