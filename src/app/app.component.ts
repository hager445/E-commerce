import { Component, } from '@angular/core';
import { ChildrenOutletContexts, RouterOutlet } from '@angular/router';
import { FlowbiteService } from './core/services/flowbite/flowbite.service';
import { NgxSpinnerComponent } from 'ngx-spinner';
import { slideInAnimation } from './shared/directives/animations';
import AOS from 'aos'
import { NgxPaginationModule } from 'ngx-pagination';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet , NgxSpinnerComponent , NgxPaginationModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations:   [slideInAnimation] 
})
export class AppComponent {
  title = 'e-commerce';

  constructor(private flowbiteService: FlowbiteService , private contexts: ChildrenOutletContexts) {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite(flowbite => {
      // Your custom code here
      console.log('Flowbite loaded', flowbite);
    });
    
      AOS.init({
        duration: 1000, // مدة التأثير (مللي ثانية)
        once: true, 
        offset: 150, // متى يبدأ التأثير (كلما زادت القيمة، تأخر التأثير)
      easing: 'ease-in-out', // التشغيل مرة واحدة فقط
      });
    
  }
  

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }

}
