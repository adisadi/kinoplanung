import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response, Headers } from '@angular/http';

import { AppConfig } from '../../../app.config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthCommonService } from '../../../services/auth-common.service';
import { TenantCommonService } from '../../../services/tenant-common.service';

@Injectable({
  providedIn: 'root'
})
export class DutyTypesService {

  constructor(private http: Http,
     private config: AppConfig,
     private authCommonService: AuthCommonService,
     private tenantCommonService: TenantCommonService) { }

    getAll() {
        return this.http.get(this.config.apiUrl + '/api/dutytype/getall/' +  this.tenantCommonService.getCurrentTenant(null).id, this.authCommonService.GetJwtRequestOptions()).pipe(map((response: Response) => response.json()));
    }

    getById(id: number) {
        return this.http.get(this.config.apiUrl + '/api/dutytype/get/' + id, this.authCommonService.GetJwtRequestOptions()).pipe(map((response: Response) => response.json()));
    }

    save(dutyType: DutyType) {
        dutyType.tenantid= this.tenantCommonService.getCurrentTenant(null).id;
        return this.http.post(this.config.apiUrl + '/api/dutytype/save', dutyType, this.authCommonService.GetJwtRequestOptions()).pipe(map((response: Response) => response.json()));
    }

    delete(id: number) {
        return this.http.delete(this.config.apiUrl + '/api/dutytype/delete/' + id, this.authCommonService.GetJwtRequestOptions());
    }
}

export class DutyType{
  name:string;
  id:number;
  tenantid:number;
  color:string
}
