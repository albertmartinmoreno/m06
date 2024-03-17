import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../user';
import { Error } from '../../interfaces/error';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
  formGroup!: FormGroup;

  message?: string;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group(
      {
        name: [
          '',
          Validators.required
        ],
        password: [
          '',
          Validators.required
        ]
      }
    )
  }

  get name(): AbstractControl | null {
    return this.formGroup.get('name');
  }

  get password(): AbstractControl | null {
    return this.formGroup.get('password');
  }

  ngSubmit(event: Event) {
    event.preventDefault();

    if (this.formGroup.valid) {
      const user: User = this.formGroup.value;

      this.userService.login(user).subscribe(
        {
          next: (): void => {
            this.router.navigate(['/']);
          },
          error: (error: Error) => {
            this.message = error.status;
          }
        }
      );
    }
  }
}
