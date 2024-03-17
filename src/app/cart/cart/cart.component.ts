import { Component, OnDestroy, OnInit } from '@angular/core';
import { Cart } from '../cart';
import { CartService } from '../cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})

export class CartComponent implements OnInit, OnDestroy {
  cart!: Cart[];
  cartSubscription!: Subscription;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    this.cartSubscription = this.cartService.cartUpdated.subscribe(
      (updatedCart: Cart[]) => {
        this.cart = updatedCart;
      }
    );
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }

  deleteProduct(productName: string): void {
    this.cartService.deleteProduct(productName);
  }
}
