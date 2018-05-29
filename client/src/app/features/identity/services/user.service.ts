import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response, Headers } from '@angular/http';

import { AppConfig } from '../../../app.config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthCommonService } from '../../../services/auth-common.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: Http, private config: AppConfig,private authCommonService: AuthCommonService) { }

    getAll() {
        return this.http.get(this.config.apiUrl + '/api/accounts/getall',this.authCommonService.GetJwtRequestOptions()).pipe(map((response: Response) => response.json()));
    }

    save(user: User) {
        return this.http.post(this.config.apiUrl + '/api/accounts/save', user, this.authCommonService.GetJwtRequestOptions()).pipe(map((response: Response) => response.json()));
    }

    delete(id: number) {
        return this.http.delete(this.config.apiUrl + '/api/accounts/delete/' + id, this.authCommonService.GetJwtRequestOptions());
    }
}

export class User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
}