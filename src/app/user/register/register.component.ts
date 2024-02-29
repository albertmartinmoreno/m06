import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Error } from '../../interfaces/error';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})

export class RegisterComponent implements OnInit {
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
          [
            Validators.required, 
            Validators.pattern(/^[a-zA-Z]{6,}$/)
          ]
        ],
        password: [
          '',
          [
            Validators.required, 
            Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
          ]
        ]
      }
    );
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
           
      this.userService.register(user).subscribe(
        {
          error: (error: Error) => {
            this.message = error.status;
          }
        }
      );
    }
  }
}
