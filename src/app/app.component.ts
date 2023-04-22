import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit {
  signedin$: BehaviorSubject<boolean>;
  constructor(private authService: AuthService) {
    this.signedin$ = authService.signedin$;
    console.log(authService.signedin$.value);
  }
  ngOnInit() {
    this.authService.checkAuth().subscribe(() => {});
  }
}
