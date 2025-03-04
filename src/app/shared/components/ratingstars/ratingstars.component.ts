import { Component, Input } from '@angular/core';
import { ArrayPipe } from '../../../core/pipes/array.pipe';
import { NotintegerPipe } from '../../../core/pipes/notinteger.pipe';

@Component({
  selector: 'app-ratingstars',
  imports: [ArrayPipe, NotintegerPipe],
  templateUrl: './ratingstars.component.html',
  styleUrl: './ratingstars.component.scss'
})
export class RatingstarsComponent {
@Input() ratingAverage!:number;
}
