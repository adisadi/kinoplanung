import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AppConfig } from '../../../app.config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient, private config: AppConfig) { }

    getAll() {
        return this.http.get(this.config.apiUrl + '/api/accounts/getall');
    }

    save(user: User) {
        return this.http.post<User>(this.config.apiUrl + '/api/accounts/save', user);
    }

    delete(id: number) {
        return this.http.delete(this.config.apiUrl + '/api/accounts/delete/' + id);
    }
}

export class User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    role:string;
    tenants:number[];
}