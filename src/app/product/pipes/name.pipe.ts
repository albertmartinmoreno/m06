import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';

@Pipe({
  name: 'name'
})
export class NamePipe implements PipeTransform {

  transform(products: Product[], name: string): Product[] {
    if (!name) {
      return products;
    }
    
    name = name.toLocaleLowerCase();

    const filteredProducts: Product[] = products.filter(product => {
      return product.name.toLocaleLowerCase().includes(name);
    });

    return filteredProducts;
  }

}
