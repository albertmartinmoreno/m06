import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {

  transform(products: Product[], price: number): Product[] {
    if (!price) {
      return products;
    }
    
    const filteredProducts: Product[] = products.filter(product => {
      return product.price >= price;
    });

    return filteredProducts;
  }

}
