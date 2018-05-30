import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../app.config';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tenant } from '../features/tenants/services/tenant.service';



@Injectable({
  providedIn: 'root'
})
export class TenantCommonService {

  constructor(private http: HttpClient, private config: AppConfig) { }

  getAll() {
    return this.http.get<Tenant[]>(this.config.apiUrl + '/api/tenant/getall');
  }

  setCurrentTenant(tenant: Tenant) {
    console.log('setCurrentTenant:' + JSON.stringify(tenant));
    localStorage.setItem('currentTenant', JSON.stringify(tenant));
    this.tenantSubject.next(tenant);
  }

  notifyTenantChange(){
    this.tenantsChange.next();
  }

  getCurrentTenant(defaultTenant: Tenant | null | undefined): Tenant | null {

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

  private tenantSubject = new Subject<Tenant>();

  CurrentTenant(): Observable<Tenant> {
    return this.tenantSubject.asObservable();
  }

  private tenantsChange=new Subject<void>();

  OnTenantsChange(){
    return this.tenantsChange.asObservable();
  }

}
