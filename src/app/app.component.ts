import { Component } from '@angular/core';
import { UserService } from './user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})

export class AppComponent {
  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  isAuthorized(): boolean {
    return this.userService.isAuthorized();
  }

  logout(): void {
    this.userService.logout();

    this.router.navigate(['/']);
  }
}
