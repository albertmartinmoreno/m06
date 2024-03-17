import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { User } from './user';
import { catchError, map } from 'rxjs/operators';
import { Error } from '../interfaces/error';
import { StorageService } from '../services/storage.service';
import { Item } from '../interfaces/item';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  item: Item = {
    key: 'token',
    value: null
  }

  constructor(
    private httpClient: HttpClient,
    private storageService: StorageService
  ) {}

  register(user: User): Observable<void> {
    const url: string = 'http://localhost:5000/register';

    return this.httpClient.post<void>(url, user).pipe(
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

  login(user: User): Observable<void> {
    const url: string = 'http://localhost:5000/login';

    return this.httpClient.post<string>(url, user).pipe(
      map(
        (response: string): void => {
          this.item.value = response;

          this.storageService.setItem(this.item);
        }
      ),
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

  logout(): void {
    this.storageService.removeItem(this.item);
    this.item.key = 'cart';
    this.storageService.removeItem(this.item);
  }

  isAuthorized(): boolean {
    return this.storageService.getItem(this.item) !== null;
  }
}
