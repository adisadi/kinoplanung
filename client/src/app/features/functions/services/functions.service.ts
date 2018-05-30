import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AppConfig } from '../../../app.config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TenantCommonService } from '../../../services/tenant-common.service';

@Injectable({
    providedIn: 'root'
})
export class FunctionsService {

    constructor(private http: HttpClient,
        private config: AppConfig,
        private tenantCommonService: TenantCommonService) { }

    getAll() {
        return this.http.get(this.config.apiUrl + '/api/function/getall/' + this.tenantCommonService.getCurrentTenant(null).id);
    }

    getById(id: number) {
        return this.http.get(this.config.apiUrl + '/api/function/get/' + id);
    }

    save(functions: Function) {
        functions.tenantid = this.tenantCommonService.getCurrentTenant(null).id;
        return this.http.post<Function>(this.config.apiUrl + '/api/function/save', functions);
    }

    delete(id: number) {
        return this.http.delete(this.config.apiUrl + '/api/function/delete/' + id);
    }
}

export class Function {
    name: string;
    id: number;
    tenantid: number;
}
