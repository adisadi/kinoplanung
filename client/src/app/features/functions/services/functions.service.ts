import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response, Headers } from '@angular/http';

import { AppConfig } from '../../../app.config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  constructor(private http: Http, private config: AppConfig) { }

    getAll() {
        return this.http.get(this.config.apiUrl + '/api/function/getall', this.jwt()).pipe(map((response: Response) => response.json()));
    }

    getAllTenants() {
        return this.http.get(this.config.apiUrl + '/api/tenant/getall', this.jwt()).pipe(map((response: Response) => response.json()));
    }

    getById(id: number) {
        return this.http.get(this.config.apiUrl + '/api/function/get/' + id, this.jwt()).pipe(map((response: Response) => response.json()));
    }

    save(functions: Function) {
        return this.http.post(this.config.apiUrl + '/api/function/save', functions, this.jwt()).pipe(map((response: Response) => response.json()));
    }

    delete(id: number) {
        return this.http.delete(this.config.apiUrl + '/api/function/delete/' + id, this.jwt());
    }

    // private helper methods
    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}

export class Function{
  name:string;
  id:number;
  tenantid:number;
}
