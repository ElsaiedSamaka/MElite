import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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
  signedin$: BehaviorSubject<boolean>;

  constructor(private authService: AuthService) {
    this.signedin$ = authService.signedin$;
  }

  ngOnInit() {
    this.user = this.authService.USER$.value;
    this.authService.checkAuth().subscribe(() => {});
  }
  toggleNavDropdown() {
    this.showNavDropdown = !this.showNavDropdown;
  }
  toggleCartDropDown() {
    this.showCartDropdown = !this.showCartDropdown;
  }
}
