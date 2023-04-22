import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/core/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  authForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(25),
    ]),
  });
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {}
  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }
    console.log(this.authForm.value);
    this.authService
      .signin(this.authForm.value.email, this.authForm.value.password)
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/index');
        },
        error: (err) => {
          if (!err.status) {
            this.authForm.setErrors({ noConnection: true });
          } else if (err.message) {
            this.authForm.setErrors({ credentials: true });
          } else {
            this.authForm.setErrors({ unknownError: true });
          }
        },
      });
  }
}
