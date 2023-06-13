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
  user: any = this.authService.USER$.value;
  showErrToast: boolean = false;
  toastErrMessage: string = '';
  showSucsessToast: boolean = false;
  toastSucsessMessage: string = '';
  isSubmitted: boolean = true;
  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getUser();
    this.userForm.patchValue({
      firstname: this.user.firstname,
      lastname: this.user.lastname,
      email: this.user.email,
      phonenumber: this.user.phonenumber,
      countrycode: this.user.countrycode,
    });
    console.log('user [user-form component]', this.user);
  }
  getUser(): void {
    this.usersService.getUser().subscribe({
      next: (user) => {
        this.user = this.authService.USER$.value;
      },
      error: (err) => {
        console.log('error', err);
      },
      complete: () => {},
    });
  }
  userForm = new FormGroup({
    firstname: new FormControl({ value: '', disabled: this.isSubmitted }, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15),
    ]),
    lastname: new FormControl({ value: '', disabled: this.isSubmitted }, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15),
    ]),
    email: new FormControl({ value: '', disabled: this.isSubmitted }, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(40),
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    countrycode: new FormControl({ value: '', disabled: this.isSubmitted }),
    phonenumber: new FormControl({ value: '', disabled: this.isSubmitted }, [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(50),
      Validators.pattern('^[0-9]*$'),
    ]),
  });
  onUserFormSubmit(): void {
    const user = {
      firstname: this.userForm.controls.firstname.value,
      lastname: this.userForm.controls.lastname.value,
      email: this.userForm.controls.email.value,
      countrycode: this.userForm.controls.countrycode.value,
      phonenumber: this.userForm.controls.phonenumber.value,
      roleId: this.user.roleId,
    };
    if (this.userForm.invalid) return;
    this.usersService.put(this.user.id, user).subscribe({
      next: (res) => {
        this.userForm.reset();
        this.toastSucsessMessage = 'تم تحديث البيانات بنجاح ';
        this.toggleSucsessToast();
        this.toggleUserForm();
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
  toggleUserForm(): void {
    this.isSubmitted = !this.isSubmitted;
    if (!this.isSubmitted) {
      this.userForm.get('firstname').enable();
      this.userForm.get('lastname').enable();
      this.userForm.get('phonenumber').enable();
      this.userForm.get('email').enable();
      this.userForm.get('countrycode').enable();
    } else {
      this.userForm.get('firstname').disable();
      this.userForm.get('lastname').disable();
      this.userForm.get('phonenumber').disable();
      this.userForm.get('email').disable();
      this.userForm.get('countrycode').disable();
    }
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
