import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { RolesService } from 'src/core/services/roles.service';
import { UsersService } from 'src/core/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  roles: any[] = [];
  roleId: string;
  usersToDisplay: any[] = [];
  selecteduserId: string;
  selectedusersIds: any[] = [];
  showFiltersDDL: boolean = false;
  showRoleDDL: boolean = false;
  showConfirmationModal: boolean = false;
  showUpdateUserModal: boolean = false;
  showSucsessToast: boolean = false;
  toastSucsessMessage: string = '';
  showErrToast: boolean = false;
  toastErrMessage: string = '';
  currentPage = 1;
  totalPages: number = 0;
  perPage = 10;
  constructor(
    private usersService: UsersService,
    private rolesService: RolesService
  ) {}

  ngOnInit() {
    this.getUsers();
  }
  searchForm = new FormGroup({
    searchControl: new FormControl('', Validators.required),
  });
  editUserForm = new FormGroup({
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

  onEditUserSubmit(): void {
    const user = {
      firstname: this.editUserForm.controls.firstname.value,
      lastname: this.editUserForm.controls.lastname.value,
      email: this.editUserForm.controls.email.value,
      countrycode: this.editUserForm.controls.countrycode.value,
      phonenumber: this.editUserForm.controls.phonenumber.value,
      roleId: this.editUserForm.controls.role.value.id,
      active: this.editUserForm.controls.active.value,
    };
    if (this.editUserForm.invalid) return;
    this.usersService.put(this.selecteduserId, user).subscribe({
      next: (res) => {
        this.editUserForm.reset();
        this.getUsers();
        this.toastSucsessMessage = 'تم تحديث بيانات المستخدم بنجاح ';
        this.toggleSucsessToast();
      },
      error: (err) => {
        this.toastErrMessage =
          err.message || 'عفوا , حدث خطأ اثناء تحديث بيانات المستخدم ';
        this.toggleErrToast();
        console.log('err', err);
      },
      complete: () => {
        this.toggleUpdateModal();
        console.log('complete');
      },
    });
  }

  getUsers(): void {
    this.usersService.getUsers().subscribe({
      next: (res) => {
        this.users = this.usersService.users$.value;
        this.totalPages = Math.ceil(res.length / 10);
        // sort users desc
        this.users.sort((a, b) => b.id - a.id);
        this.usersToDisplay = this.paginate(this.currentPage, this.perPage);
      },
      error: (err) => {
        this.toastErrMessage =
          err.message || 'خطأ غير متوفع اثناء جلب بيانات المستخدمين';
        this.toggleErrToast();
        console.log('error', err);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }
  getUsersByRole(id: string): void {
    this.roleId = id;
    this.usersService.getByRole(id).subscribe({
      next: (res) => {
        this.users = this.usersService.users$.value;
        this.usersToDisplay = this.paginate(this.currentPage, this.perPage);
      },
      error: (err) => {
        console.log('err', err);
      },
      complete: () => {},
    });
  }

  handleSearchOverUsers() {
    this.searchForm.controls.searchControl.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap((searchString) => {
          return this.usersService.search(searchString);
        })
      )
      .subscribe({
        next: (res) => {
          this.usersToDisplay = this.usersService.users$.value;
        },
        error: (err) => {
          this.toastErrMessage = err.message || 'خطأ غير متوقع';
          this.toggleErrToast();
          console.log('error', err);
        },
        complete: () => {
          console.log('complete');
        },
      });
  }

  handleUserSelection(id: string): void {
    if (this.selecteduserId == id) {
      this.selecteduserId = undefined;
    } else {
      this.selecteduserId = id;
    }
  }

  activeDeactiveUserById(id: string): void {
    this.usersService.patch(id).subscribe({
      next: (res) => {
        this.getUsers();
        this.toastSucsessMessage = 'عملية ناجحة';
        this.toggleSucsessToast();
      },
      error: (err) => {
        this.toastErrMessage = err.message || 'عفوا , حدث خطأ اثناء العملية ';
        this.toggleErrToast();
        console.log('err', err);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }

  deleteById(id: string): void {
    this.usersService.deleteById(id).subscribe({
      next: (res) => {
        this.usersToDisplay = this.users.filter((user) => user.id !== res.id);
        this.toastSucsessMessage = 'تم حذف المستخدم بنجاح';
        this.toggleSucsessToast();
      },
      error: (err) => {
        this.toastErrMessage =
          err.message || 'عفوا , حدث خطأ اثناء حذف المستخدم';
        this.toggleErrToast();
        this.toggleConfirmationModal();
        console.log('err', err);
      },
      complete: () => {
        this.toggleConfirmationModal();
        console.log('complete');
      },
    });
  }

  getRoles(): void {
    this.rolesService.getRoles().subscribe({
      next: (res) => {
        this.roles = res;
        console.log('roles', res);
      },
      error: (err) => {
        console.log('err', err);
      },
      complete: () => {},
    });
  }
  toggleFiltersDDL() {
    this.showFiltersDDL = !this.showFiltersDDL;
    if (this.showFiltersDDL) {
      this.getRoles();
    }
  }
  toggleRolesDDL() {
    this.showRoleDDL = !this.showRoleDDL;
    if (this.showRoleDDL) {
      this.getRoles();
    }
  }
  toggleConfirmationModal() {
    this.showConfirmationModal = !this.showConfirmationModal;
  }
  toggleUpdateModal(userId?) {
    let user: any;
    this.showUpdateUserModal = !this.showUpdateUserModal;
    this.showRoleDDL = false;
    if (this.showUpdateUserModal) {
      this.usersService.getById(this.selecteduserId).subscribe({
        next: (res) => {
          user = res;
        },
        error: (err) => {
          this.toastErrMessage = err.message || 'خطأ غير متوقع';
          this.toggleErrToast();
          console.log('err', err);
        },
        complete: () => {
          this.editUserForm.patchValue({
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            phonenumber: user.phonenumber,
            countrycode: user.countrycode,
            role: user.role,
            active: user.isActive,
          });
        },
      });
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
  public onGoTo(page: number): void {
    this.currentPage = page;
    this.usersToDisplay = this.paginate(this.currentPage, this.perPage);
  }

  public onNext(page: number): void {
    if (this.currentPage === this.totalPages) return;
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.usersToDisplay = this.paginate(this.currentPage, this.perPage);
    }
  }

  public onPrevious(page: number): void {
    if (this.currentPage === 1) return;
    if (this.currentPage > 1) {
      this.currentPage--;
      this.usersToDisplay = this.paginate(this.currentPage, this.perPage);
    }
  }

  public paginate(current: number, perPage: number): any[] {
    return [...this.users.slice((current - 1) * perPage).slice(0, perPage)];
  }
}
