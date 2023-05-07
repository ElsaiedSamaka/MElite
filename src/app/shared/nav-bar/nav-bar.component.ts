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
  showNotfiDropdown = false;
  showCartDropdown = false;
  signedin$: BehaviorSubject<boolean>;

  constructor(private authService: AuthService) {
    this.signedin$ = authService.signedin$;
    console.log(authService.signedin$.value);
  }

  ngOnInit() {
    this.user = this.authService.USER.getValue();
    this.authService.checkAuth().subscribe(() => {});
  }
  toggleNavDropdown() {
    this.showNavDropdown = !this.showNavDropdown;
  }
  toggleNotfiDropDown() {
    this.showNotfiDropdown = !this.showNotfiDropdown;
    this.showCartDropdown = false;
  }
  toggleCartDropDown() {
    this.showCartDropdown = !this.showCartDropdown;
    this.showNotfiDropdown = false;
  }
}
