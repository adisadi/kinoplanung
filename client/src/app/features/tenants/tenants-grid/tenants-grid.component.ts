import { Component, OnInit } from '@angular/core';
import { TenantService } from '../services/tenant.service';
import { AlertService } from '../../../services/alert.service';

import DataSource from 'devextreme/data/data_source';
import { TenantCommonService } from '../../../services/tenant-common.service';

@Component({
  selector: 'app-tenants-grid',
  templateUrl: './tenants-grid.component.html',
  styleUrls: ['./tenants-grid.component.css']
})
export class TenantsGridComponent implements OnInit {

  constructor(private tenantService: TenantService, private alertService: AlertService, private tenantCommonService: TenantCommonService) { }

  dataSource: any = [];

  ngOnInit() {
    this.tenantService.getAll()
      .subscribe(
        data => {
          this.dataSource = data;
        },
        error => {
          console.log(error);
          this.alertService.error(error._body);
        });
  }

  rowInsert(event) {
    event.cancel = new Promise((resolve, reject) => {
      this.tenantService.save(event.data)
        .subscribe(
          (result) => {
            event.data.id = result.id;
            this.alertService.success(`Mandant '${event.data.name}' gespeichert.`);
            this.tenantCommonService.notifyTenantChange();
            resolve(false);
          },
          error => {
            console.log(error);
            this.alertService.error(error._body);
            resolve(true);
          });
    });
  }
  rowUpdate(event) {
    console.log(event);
    event.data = { id: event.key, name: event.newData.name };
    this.rowInsert(event);
  }

  rowDelete(event) {
    event.cancel = new Promise((resolve, reject) => {

      let currentTenant = this.tenantCommonService.getCurrentTenant(null);

      if (currentTenant && currentTenant.id === event.data.id) {
        this.alertService.error("Der aktive Mandant kann nicht gelöscht werden. Wechseln Sie zuerst den aktiven Mandanten.");
        resolve(true);
        return;
      }

      this.tenantService.delete(event.data.id)
        .subscribe(
          () => {
            this.alertService.success(`Mandant '${event.data.name}' gelöscht`);
            this.tenantCommonService.notifyTenantChange();
            resolve(false);
          },
          error => {
            console.log(error);
            this.alertService.error(error._body);
            resolve(true);
          });
    });
  }
}
