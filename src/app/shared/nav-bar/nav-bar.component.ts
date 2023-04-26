import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/core/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  user;
  constructor(private authService: AuthService) {
    this.user = authService.USER.value;
    console.log(this.user);
  }

  ngOnInit() {}
}
