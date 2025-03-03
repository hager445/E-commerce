import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrdersService } from '../../core/services/orders/orders.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-billingdetails',
  imports: [ReactiveFormsModule ],
  templateUrl: './billingdetails.component.html',
  styleUrl: './billingdetails.component.scss'
})
export class BillingdetailsComponent {
  isLoading:boolean = false ;
  cartId!:string;
   private readonly _OrdersService = inject(OrdersService);
   private readonly _ActivatedRoute = inject(ActivatedRoute);
  constructor() {}

  billingDetails: FormGroup = new FormGroup({
    details:new FormControl(null),
    phone:new FormControl(null),
    city:new FormControl(null),
  })
  ngOnInit(): void {

  //  get product id :
    this._ActivatedRoute.paramMap.subscribe({
      next:(param)=>{
       this.cartId = param.get('id')!;
  
      }
    })
  }
  sendUserDetails():void{
    this.isLoading = true ;
    this._OrdersService.createCashOrder(this.billingDetails.value,this.cartId).subscribe({
      next:(res)=>{
        console.log(res);
        open(res.session.url,'_self');
       this.isLoading = false ;
        
      }
    })

  }
}
