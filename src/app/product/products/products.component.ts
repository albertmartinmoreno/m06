import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../interfaces/product';
import { Error } from '../../interfaces/error';
import { Category } from '../interfaces/category';
import { CartService } from '../../cart/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
})

export class ProductsComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];

  message?: string;

  currentPage: number = 1;
  itemsPerPage: number = 5;

  price: number = 0;
  name: string = '';
  category!: Category;

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      {
        next: (response: Product[]): void => {
          this.products = response;
        },
        error: (error: Error): void => {
          this.message = error.status;
        }
      }
    );

    this.productService.getCategories().subscribe(
      {
        next: (response: Category[]): void => {
          this.categories = response;
        },
        error: (error: Error): void => {
          this.message = error.status;
        }
      }
    );
  }

  addFavorite(productId: number): void {
    if (confirm('Add product to favorites?')) {
      this.productService.addFavorite(productId).subscribe(
        {
          error: (error: Error): void => {
            this.message = error.status;
          }
        }
      );
    }
  }

  buyProduct(product: Product): void {
    if (product.quantity) {
      this.cartService.addProduct(product);
      
      product.quantity = 0;
    }
  }

  pageChange(page: number): void {
    this.currentPage = page;
  }
}
