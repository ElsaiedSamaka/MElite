import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/core/services/auth.service';
import { UsersService } from 'src/core/services/users.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
})
export class UserCardComponent implements OnInit {
  user: any = {
    username: 'username',
    email: 'lorem@example.com',
    phonenumber: '011-50567130',
    role: {
      name: 'user',
    },
  };

  constructor(
    private userService: UsersService,
    private authService: AuthService
  ) {}

  ngOnInit() {
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
