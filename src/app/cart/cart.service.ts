import { Injectable } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Product } from '../product/interfaces/product';
import { Cart } from './cart';
import { Item } from '../interfaces/item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  item: Item = {
    key: 'cart',
    value: null
  }

  cartUpdated = new Subject<Cart[]>();

  constructor(private storageService: StorageService) {}

  addProduct(product: Product) {
    const storage: string | null = this.storageService.getItem(this.item);

    const updatedCart: Cart[] = storage ? JSON.parse(storage) : [];

    if (product.quantity) {
      const cart: Cart = {
        quantity: product.quantity,
        amount: product.price * product.quantity,
        productName: product.name
      }
      
      updatedCart.push(cart);
    }

    this.item.value = JSON.stringify(updatedCart);

    this.storageService.setItem(this.item);
  }

  getCart(): Cart[] {
    const cart: string | null = this.storageService.getItem(this.item);

    return cart ? JSON.parse(cart) : [];
  }

  deleteProduct(productName: string) {
    const cart: string | null = this.storageService.getItem(this.item);
    let  updatedCart: Cart[] = cart ? JSON.parse(cart) : [];

    updatedCart = updatedCart.filter(product => {
      return product.productName !== productName;
    });

    this.item.value = JSON.stringify(updatedCart);

    this.storageService.setItem(this.item);
    this.cartUpdated.next(updatedCart);
  }
}
