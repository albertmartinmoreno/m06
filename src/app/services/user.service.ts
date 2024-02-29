import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { User } from '../interfaces/user';
import { Authentication } from '../interfaces/authentication';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Error } from '../interfaces/error';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isAuthenticated: boolean = false;

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) {}

  register(user: User): Observable<void> {
    const url: string = 'http://localhost:5000/register';

    return this.httpClient.post<void>(url, user).pipe(
      tap(
        () => {
          this.router.navigate(['/login']);
        }
      ),
      catchError(
        (httpErrorResponse: HttpErrorResponse) => {
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

    return this.httpClient.post<Authentication>(url, user).pipe(
      map(
        (authentication: Authentication) => {
          this.isAuthenticated = true;

          const token: string = authentication.token;
          
          localStorage.setItem('token', token);

          this.router.navigate(['/products']);
        }
      ),
      catchError(
        (httpErrorResponse: HttpErrorResponse) => {
          const error: Error = httpErrorResponse.error;

          return throwError(
            () => error
          );
        }
      )
    );
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
