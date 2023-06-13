import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/core/services/auth.service';
import { UsersService } from 'src/core/services/users.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  user: any;
  showErrToast: boolean = false;
  toastErrMessage: string = '';
  showSucsessToast: boolean = false;
  toastSucsessMessage: string = '';
  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.user = this.authService.USER$.value;
  }
  userForm = new FormGroup({
    firstname: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15),
    ]),
    lastname: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(40),
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    countrycode: new FormControl(),
    phonenumber: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(50),
      Validators.pattern('^[0-9]*$'),
    ]),
    role: new FormControl(),
    active: new FormControl(),
  });
  onUserFormSubmit(): void {
    const user = {
      firstname: this.userForm.controls.firstname.value,
      lastname: this.userForm.controls.lastname.value,
      email: this.userForm.controls.email.value,
      countrycode: this.userForm.controls.countrycode.value,
      phonenumber: this.userForm.controls.phonenumber.value,
      role: this.userForm.controls.role.value,
      active: this.userForm.controls.active.value,
    };
    if (this.userForm.invalid) return;
    this.usersService.put(this.user.id, user).subscribe({
      next: (res) => {
        this.userForm.reset();
        this.toastSucsessMessage = 'تم تحديث البيانات بنجاح ';
        this.toggleSucsessToast();
      },
      error: (err) => {
        this.toastErrMessage =
          err.message || 'عفوا , حدث خطأ اثناء تحديث البيانات  ';
        this.toggleErrToast();
        console.log('err', err);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }
  toggleSucsessToast() {
    this.showSucsessToast = !this.showSucsessToast;
    setTimeout(() => {
      this.showSucsessToast = false;
    }, 4000);
  }
  toggleErrToast() {
    this.showErrToast = !this.showErrToast;
    setTimeout(() => {
      this.showErrToast = false;
    }, 4000);
  }
}
