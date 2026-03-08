import { Component, Input } from '@angular/core';
import { ArrayPipe } from '../../../core/pipes/array.pipe';
import { NotintegerPipe } from '../../../core/pipes/notinteger.pipe';
import { TrimPipe } from '../../../core/pipes/trim.pipe';

@Component({
  selector: 'app-ratingstars',
  imports: [ArrayPipe, NotintegerPipe, TrimPipe],
  templateUrl: './ratingstars.component.html',
  styleUrl: './ratingstars.component.scss',
})
export class RatingstarsComponent {
  @Input() ratingAverage!: number;
}
