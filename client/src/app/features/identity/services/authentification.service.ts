import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppConfig } from '../../../app.config';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(private http: Http, private config: AppConfig) {
    console.log('AuthentificationService');
   }

  login(username: string, password: string) {
    
    console.log(JSON.stringify({ UserName: username, Password: password }));
    return this.http.post(this.config.apiUrl + '/api/auth/login', { UserName: username, Password: password }).pipe(
      map((response: Response) => {
        // login successful if there's a jwt token in the response
        let user = response.json();
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
