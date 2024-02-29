import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import { Error } from '../../interfaces/error';

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

  onSubmit(event: Event) {
    event.preventDefault();

    if (this.formGroup.valid) {
      const user: User = this.formGroup.value;

      this.userService.login(user).subscribe(
        {
          error: (error: Error) => {
            this.message = error.status;
          }
        }
      );
    }
  }
}
