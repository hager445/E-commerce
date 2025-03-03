import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-blank-layout',
  imports: [FooterComponent,NavbarComponent,RouterOutlet],
  templateUrl: './blank-layout.component.html',
  styleUrl: './blank-layout.component.scss'
})
export class BlankLayoutComponent {

}
