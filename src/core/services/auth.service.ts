import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  api_url = environment.api_url;

  // TODO: Right now we are using a BehaviorSubject to store the signed in status of the user
  // This is not the best way to do this, but it is the easiest way to get started
  // We will need to change this public property to a private property
  signedin$ = new BehaviorSubject<boolean>(false);
  USER = new BehaviorSubject(null);

  constructor(private http: HttpClient) {}

  // checkAuth will be called whenever our app component is initialized
  // we can use this to check if the user is authenticated
  checkAuth() {
    return this.http.get<any>(`${this.api_url}/api/auth/signedin`).pipe(
      tap(({ authentication }) => {
        this.signedin$.next(authentication);
      })
    );
  }
  // signout will be called when the user clicks the signout button
  // we will send a request to the server to sign the user out
  signout() {
    return this.http.post<any>(`${this.api_url}/api/auth/signout`, {}).pipe(
      tap(() => {
        this.signedin$.next(false);
      })
    );
  }
  // signin will be called when the user submits the signin form
  // we will send the user's credentials to the server
  signin(email: string, password: string) {
    return this.http
      .post<any>(`${this.api_url}/api/auth/signin`, {
        email: email,
        password: password,
      })
      .pipe(
        tap((res) => {
          this.USER.next(res);
          this.signedin$.next(true);
        })
      );
  }
}
