import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trim'
})
export class TrimPipe implements PipeTransform {

  transform(title:string , num :number): string {
    return title.split(" " , num).join(" ");
  }

}
