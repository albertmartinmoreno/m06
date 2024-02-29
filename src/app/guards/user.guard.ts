import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';

export const userGuard: CanActivateFn = (): boolean => {
  const isAuthenticated: boolean = inject(UserService).isAuthenticated;

  if (!isAuthenticated) {
    inject(Router).navigate(['/login']);

    return false;
  }

  return true;
};
