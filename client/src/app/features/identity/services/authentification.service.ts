import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppConfig } from '../../../app.config';
import { AuthCommonService } from '../../../services/auth-common.service';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(private http: HttpClient, private config: AppConfig, private authCommonService: AuthCommonService) {
    console.log('AuthentificationService');
  }

  login(username: string, password: string) {

    console.log(JSON.stringify({ UserName: username, Password: password }));
    return this.http.post(this.config.apiUrl + '/api/auth/login', { UserName: username, Password: password }).pipe(
      map((user: any) => {
        if (user.jwt) {
          user.jwt = JSON.parse(user.jwt);
        }
        this.authCommonService.Login(user);
      }));
  }

  logout() {
    this.authCommonService.Logout();
  }
}
