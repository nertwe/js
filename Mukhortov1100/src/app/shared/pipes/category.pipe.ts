import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  transform(category: number): string {
    switch(category) {
      case 0:
        return 'Мебель';
        break;

      case 1:
        return 'Техника';
        break;
      
      case 2:
        return 'Книги';
        break;

      case 3:
        return 'Телефоны';
        break;
    }
  }

}
