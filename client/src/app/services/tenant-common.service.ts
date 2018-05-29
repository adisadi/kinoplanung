import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response, Headers } from '@angular/http';
import { AppConfig } from '../app.config';
import { AuthCommonService } from './auth-common.service';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class TenantCommonService {

  constructor(private http: Http, private config: AppConfig, private authCommonService: AuthCommonService) { }

  getAll() {
    return this.http.get(this.config.apiUrl + '/api/tenant/getall', this.authCommonService.GetJwtRequestOptions()).pipe(map((response: Response) => response.json()));
  }

  setCurrentTenant(tenant: any) {
    console.log('setCurrentTenant:' + JSON.stringify(tenant));
    localStorage.setItem('currentTenant', JSON.stringify(tenant));
    this.tenantSubject.next(tenant);
  }

  notifyChange(){
    this.getAll();
  }

  getCurrentTenant(defaultTenant: any | null | undefined): any | null {

    let currentTenant = localStorage.getItem('currentTenant');
    console.log(currentTenant);
    if (currentTenant) {
      return JSON.parse(currentTenant);
    } else if (defaultTenant) {
      this.setCurrentTenant(defaultTenant);
      return defaultTenant;
    }

    return null;
  }

  private tenantSubject = new Subject<any>();

  CurrentTenant(): Observable<any> {
    return this.tenantSubject.asObservable();
  }

}
