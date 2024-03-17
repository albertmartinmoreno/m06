import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';
import { Category } from '../interfaces/category';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  transform(products: Product[], category: Category): Product[] {
    if (!category) {
      return products;
    }

    const filteredProducts: Product[] = products.filter(product => {
      return product.categoryId === category.id;
    });

    return filteredProducts;
  }
}
