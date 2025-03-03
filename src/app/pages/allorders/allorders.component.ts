import { Component, inject } from '@angular/core';
import { AllordersService } from '../../core/services/allorders/allorders.service';
import { AuthService } from '../../core/services/auth/auth.service';
import { Iorder } from '../../shared/interfaces/orders/iorder';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-allorders',
  imports: [DatePipe , CurrencyPipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent {
private readonly _AllordersService = inject(AllordersService);
private readonly _AuthService = inject(AuthService);
allOrders:Iorder[] = []



ngOnInit(): void {
  
  
  this._AuthService.getUserInfo();
  console.log(this._AuthService.userInfo!.id);
  
  this._AllordersService.getUserOrders(this._AuthService.userInfo!.id).subscribe({
    next:(res)=>{
      console.log(this._AuthService.userInfo);
      this.allOrders = res;
    }
  })
  
}
}
