import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/core/services/auth.service';
import { UsersService } from 'src/core/services/users.service';
import { LoadingService } from './shared/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit {
  signedin$: BehaviorSubject<boolean>;
  loading$: Observable<boolean>;
  user: any = {
    username: 'username',
    email: 'lorem@example.com',
    phonenumber: '011-50567130',
    role: {
      name: 'user',
    },
  };
  constructor(
    private authService: AuthService,
    private loadingService: LoadingService,
    private userService: UsersService
  ) {
    this.signedin$ = authService.signedin$;
    this.loading$ = loadingService.loading$;
  }
  ngOnInit() {
    this.authService.checkAuth().subscribe(() => {});
    this.user = this.authService.USER$.value;
    this.userService.getUser().subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (err) => {
        console.log('error while returning current user', err);
      },
      complete: () => {},
    });
  }
}
