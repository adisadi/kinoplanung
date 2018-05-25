import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response, Headers } from '@angular/http';

import { AppConfig } from '../../../app.config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthCommonService } from '../../../services/auth-common.service';

@Injectable({
  providedIn: 'root'
})
export class TenantService {

  constructor(private http: Http, private config: AppConfig,private authCommonService:AuthCommonService) { }

    getAll() {
        return this.http.get(this.config.apiUrl + '/api/tenant/getall', this.authCommonService.GetJwtRequestOptions()).pipe(map((response: Response) => response.json()));
    }

    getById(id: number) {
        return this.http.get(this.config.apiUrl + '/api/tenant/get/' + id, this.authCommonService.GetJwtRequestOptions()).pipe(map((response: Response) => response.json()));
    }

    save(tenant: Tenant) {
        return this.http.post(this.config.apiUrl + '/api/tenant/save', tenant, this.authCommonService.GetJwtRequestOptions()).pipe(map((response: Response) => response.json()));
    }

    delete(id: number) {
        return this.http.delete(this.config.apiUrl + '/api/tenant/delete/' + id, this.authCommonService.GetJwtRequestOptions());
    }
}

export class Tenant{
  name:string;
  id:number;
}
