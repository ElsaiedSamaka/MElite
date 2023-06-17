import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/core/services/auth.service';
import { MatchPassword } from 'src/core/validators/match-password';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  showPassword: boolean = false;
  showPasswordConfirmation: boolean = false;
  showToast: boolean = false;
  toastMessage: string = '';
  authForm = new FormGroup(
    {
      firstname: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      lastname: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(80),
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(25),
      ]),
      passwordConfirmation: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(25),
      ]),
      // TODO: Add country code
      // countrycode: new FormControl('', [
      //   Validators.required,
      //   Validators.minLength(3),
      //   Validators.maxLength(15),
      // ]),
      phonenumber: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(11),
        Validators.pattern('^[0-9]*$'),
      ]),
    },
    { validators: [this.matchPassword.validate] }
  );
  ngOnInit(): void {}
  constructor(
    private matchPassword: MatchPassword,
    private authService: AuthService,
    private router: Router
  ) {}
  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }
    this.authService
      .signup(
        this.authForm.value.firstname,
        this.authForm.value.lastname,
        this.authForm.value.email,
        this.authForm.value.password,
        this.authForm.value.passwordConfirmation,
        this.authForm.value.phonenumber
      )
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/index');
        },
        error: (err) => {
          if (!err.status) {
            this.authForm.setErrors({ noConnection: true });
            this.toastMessage = ' عفوا, يرجى التحقق من اتصال الانترنت';
          } else if (err.error.message == 'Failed! Email is already in use!') {
            this.authForm.setErrors({ alreadyUsedMailError: true });
            this.toastMessage = 'البريد الالكتروني مستخدم بالفعل';
          } else {
            this.authForm.setErrors({ unknownError: true });
            this.toastMessage = ' خطأ غير متوقع';
          }
          this.toggleToast();
        },
      });
  }
  loginWithGoogle() {
    this.authService.googleLogin();
  }
  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  togglePasswordConfirmation() {
    this.showPasswordConfirmation = !this.showPasswordConfirmation;
  }
  toggleToast() {
    this.showToast = !this.showToast;
    setTimeout(() => {
      this.showToast = false;
    }, 4000);
  }
}
