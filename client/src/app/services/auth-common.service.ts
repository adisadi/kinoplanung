import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode';

export const TOKEN_NAME: string = 'currentUser';

@Injectable({
  providedIn: 'root'
})
export class AuthCommonService {

  private logger = new Subject<boolean>();

  constructor() { }

  IsAuthenticated(): boolean {
    let currentUser = JSON.parse(localStorage.getItem(TOKEN_NAME));
    if (currentUser && currentUser.jwt.auth_token) {
      //check expire date
      if (!this.isTokenExpired(currentUser.jwt.auth_token))
        return true;
    }
    return false;
  }

  GetUserRole(): Roles {

    let currentUser = JSON.parse(localStorage.getItem(TOKEN_NAME));
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
    console.log("login:" + JSON.stringify(user));
    if (user && user.jwt && user.jwt.auth_token) {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem(TOKEN_NAME, JSON.stringify(user));
      this.logger.next(true);
      return;
    }
    this.Logout();
  }

  Logout() {
    // remove user from local storage to log user out
    localStorage.removeItem(TOKEN_NAME);
    this.logger.next(false);
  }

  GetToken(): string {
    let currentUser = JSON.parse(localStorage.getItem(TOKEN_NAME));
    if (currentUser && currentUser.jwt && currentUser.jwt.auth_token) {
      return currentUser.jwt.auth_token;
    }
    return null;
  }

  private getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) return null;

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    console.log("Token Expire Date:" + date.toISOString());
    return date;
  }

  private isTokenExpired(token: string): boolean {
    if (!token) return true;

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }
}

export enum Roles { Administrator = 0, Manager = 1, Member = 2, NotAuthenticated = 3 };