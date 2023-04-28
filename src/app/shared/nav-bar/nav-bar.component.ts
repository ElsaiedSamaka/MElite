import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/core/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  user: any;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.user = this.authService.USER.getValue();
  }
}
