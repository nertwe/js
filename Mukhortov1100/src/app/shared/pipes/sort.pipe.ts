import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {
  
  transform(list, sortby: string, reverse:boolean): any[] {
    if (sortby === 'byprice') {
      list.sort(( a, b ) => a.price - b.price);
    }
    else if (sortby === 'byquantity') {
      list.sort(( a, b ) => a.quantity - b.quantity);
    }

    if (reverse) {
      list.reverse()
    }
      return list;
    
  }

}
