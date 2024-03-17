import { CanActivateFn } from '@angular/router';
import { UserService } from '../user/user.service';
import { inject } from '@angular/core';

export const cartGuard: CanActivateFn = (): boolean => {
  const userService: UserService = inject(UserService);

  const isAuthorized: boolean = userService.isAuthorized();

  if (isAuthorized) {
    return true;
  } else {
    return false;
  }
};