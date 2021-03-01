import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryFilter'
})
export class CategoryFilterPipe implements PipeTransform {
  
  transform(items: any[], searchStr: string, count: boolean): any[] {
    let filterItems = items;
    if (count) {
      filterItems = items.filter( (item) => (item.count > 0)  );
      }

    if (searchStr) {
      filterItems = filterItems.filter(
            (item) => (item.category.toLowerCase().indexOf(searchStr.toLowerCase()) !== -1) 
          );
    }



      return filterItems;
  }

}
