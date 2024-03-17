import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Error } from '../../interfaces/error';
import { Router } from '@angular/router';

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
    private router: Router
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

  ngSubmit(event: Event) {
    event.preventDefault();

    if (this.formGroup.valid) {
      const user: User = this.formGroup.value;
           
      this.userService.register(user).subscribe(
        {
          next: (): void => {
            this.router.navigate(['/login']);
          },
          error: (error: Error) => {
            this.message = error.status;
          }
        }
      );
    }
  }
}
