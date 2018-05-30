import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AppConfig } from '../../../app.config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TenantService {

  constructor(private http: HttpClient, private config: AppConfig) { }

    getAll() {
        return this.http.get(this.config.apiUrl + '/api/tenant/getall');
    }

    getById(id: number) {
        return this.http.get(this.config.apiUrl + '/api/tenant/get/' + id);
    }

    save(tenant: Tenant) {
        return this.http.post<Tenant>(this.config.apiUrl + '/api/tenant/save', tenant);
    }

    delete(id: number) {
        return this.http.delete(this.config.apiUrl + '/api/tenant/delete/' + id);
    }
}

export class Tenant{
  name:string;
  id:number;
}
