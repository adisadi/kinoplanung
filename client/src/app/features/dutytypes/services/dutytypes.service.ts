import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AppConfig } from '../../../app.config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthCommonService } from '../../../services/auth-common.service';
import { TenantCommonService } from '../../../services/tenant-common.service';

@Injectable({
  providedIn: 'root'
})
export class DutyTypesService {

  constructor(private http: HttpClient,
     private config: AppConfig,
     private authCommonService: AuthCommonService,
     private tenantCommonService: TenantCommonService) { }

    getAll() {
        return this.http.get(this.config.apiUrl + '/api/dutytype/getall/' +  this.tenantCommonService.getCurrentTenant(null).id);
    }

    getById(id: number) {
        return this.http.get(this.config.apiUrl + '/api/dutytype/get/' + id);
    }

    save(dutyType: DutyType) {
        dutyType.tenantid= this.tenantCommonService.getCurrentTenant(null).id;
        return this.http.post<DutyType>(this.config.apiUrl + '/api/dutytype/save', dutyType);
    }

    delete(id: number) {
        return this.http.delete(this.config.apiUrl + '/api/dutytype/delete/' + id);
    }
}

export class DutyType{
  name:string;
  id:number;
  tenantid:number;
  color:string
}
