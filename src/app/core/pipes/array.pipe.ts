import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'array'
})
export class ArrayPipe implements PipeTransform {

  transform(value: number): number[] {
    return Array.from({length: Math.floor(value)});
  }

}
