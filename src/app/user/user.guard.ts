import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserService } from './user.service';

export const userGuard: CanActivateFn = (): boolean => {
  const userService: UserService = inject(UserService);

  const isAuthorized: boolean = userService.isAuthorized();

  if (isAuthorized) {
    return false;
  } else {
    return true;
  }
};
