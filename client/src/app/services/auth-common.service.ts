import { Injectable } from '@angular/core';
import { RequestOptions, Headers } from '@angular/http';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthCommonService {

  private logger = new Subject<boolean>();

  constructor() { }

  IsAuthenticated(): boolean {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.jwt.auth_token) {
      return true;
    }
    return false;
  }

  GetUserRole(): Roles {

    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.role) {
      if (currentUser.role === "Administrator")
        return Roles.Administrator;
      else if (currentUser.role === "Manager")
        return Roles.Manager;
      else if (currentUser.role === "Member")
        return Roles.Member;
    }

    return Roles.NotAuthenticated;
  }

  IsLoggedIn(): Observable<boolean> {
    return this.logger.asObservable();
  }

  Login(user: any) {
    // login successful if there's a jwt token in the response
    console.log("login:"+JSON.stringify(user));
    if (user && user.jwt && user.jwt.auth_token) {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.logger.next(true);
      return;
    }
    this.Logout();
  }

  Logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.logger.next(false);
  }

  GetJwtRequestOptions(): RequestOptions {
    // create authorization header with jwt token
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.jwt && currentUser.jwt.auth_token) {
      let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.jwt.auth_token });
      return new RequestOptions({ headers: headers });
    }
  }
}

export enum Roles { Administrator = 0, Manager = 1, Member = 2, NotAuthenticated = 3 };