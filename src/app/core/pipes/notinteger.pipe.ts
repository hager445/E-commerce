import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'notinteger'
})
export class NotintegerPipe implements PipeTransform {

  transform(value: number): number {
    const trunc = Math.trunc(value);
    return value - trunc;
  }

}
