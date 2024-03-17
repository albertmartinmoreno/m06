import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../product/interfaces/product';
import { Error } from '../interfaces/error';
import { Observable, catchError, throwError } from 'rxjs';
import { Category } from './interfaces/category';
import { StorageService } from '../services/storage.service';
import { Item } from '../interfaces/item';
import { Options } from '../interfaces/options';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  item: Item = {
    key: 'token'
  }

  constructor(
    private httpClient: HttpClient,
    private storageService: StorageService
  ) {}

  getProducts(): Observable<Product[]> {
    const url: string = 'http://localhost:5000/products';

    return this.httpClient.get<Product[]>(url).pipe(
      catchError(
        (httpErrorResponse: HttpErrorResponse): Observable<never> => {
          const error: Error = httpErrorResponse.error;

          return throwError(
            () => error
          );
        }
      )
    );
  }

  getCategories(): Observable<Category[]> {
    const url: string = 'http://localhost:5000/categories';

    return this.httpClient.get<Category[]>(url).pipe(
      catchError(
        (httpErrorResponse: HttpErrorResponse): Observable<never> => {
          const error: Error = httpErrorResponse.error;

          return throwError(
            () => error
          );
        }
      )
    );
  }

  addFavorite(productId: number): Observable<void> {
    const url: string = `http://localhost:5000/favorite_products/${productId}`;

    const token: string | null = this.storageService.getItem(this.item);

    const httpHeaders: HttpHeaders = new HttpHeaders(
      {
        'Authorization': `Bearer ${token}`
      }
    );

    const options: Options= {
      headers: httpHeaders
    }

    return this.httpClient.get<void>(url, options).pipe(
      catchError(
        (httpErrorResponse: HttpErrorResponse): Observable<never> => {
          const error: Error = httpErrorResponse.error;

          return throwError(
            () => error
          );
        }
      )
    );
  }
}
