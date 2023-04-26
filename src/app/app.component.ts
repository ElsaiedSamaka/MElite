import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/core/services/auth.service';
import { LoadingService } from './shared/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit {
  signedin$: BehaviorSubject<boolean>;
  loading$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private loadingService: LoadingService
  ) {
    this.signedin$ = authService.signedin$;
    this.loading$ = loadingService.loading$;
    console.log(authService.signedin$.value);
  }
  ngOnInit() {
    this.authService.checkAuth().subscribe(() => {});
  }
}
