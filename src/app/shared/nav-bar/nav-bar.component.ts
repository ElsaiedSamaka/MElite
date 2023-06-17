import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/core/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  user: any;
  showNavDropdown = false;
  showCartDropdown = false;
  signedin$: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.checkAuth().subscribe((res) => {
      this.signedin$ = this.authService.signedin$.value;
    });
    this.user = this.authService.USER$.value;
  }
  toggleNavDropdown() {
    this.showNavDropdown = !this.showNavDropdown;
  }
  toggleCartDropDown() {
    this.showCartDropdown = !this.showCartDropdown;
  }
}
