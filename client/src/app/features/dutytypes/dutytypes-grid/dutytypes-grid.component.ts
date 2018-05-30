import { Component, OnInit } from '@angular/core';
import { DutyTypesService, DutyType } from '../services/dutytypes.service';
import { AlertService } from '../../../services/alert.service';

import DataSource from 'devextreme/data/data_source';
import { TenantCommonService } from '../../../services/tenant-common.service';

@Component({
  selector: 'app-dutytypes-grid',
  templateUrl: './dutytypes-grid.component.html',
  styleUrls: ['./dutytypes-grid.component.css']
})
export class DutyTypesGridComponent implements OnInit {

  constructor(private dutyTypeService: DutyTypesService,
    private alertService: AlertService,
    private tenantCommonService: TenantCommonService) { }

  tenants: any = [];
  dataSource: any = [];
  groupCaption: string = "Dienste";
  ngOnInit() {
    this.tenantCommonService.CurrentTenant().subscribe(tenant => {
      this.loadData(tenant);
    });
    this.loadData(this.tenantCommonService.getCurrentTenant(null));
  }

  loadData(tenant) {
    this.groupCaption = `Dienste für Mandant ${tenant.name}`;
    this.dutyTypeService.getAll()
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
      this.dutyTypeService.save(event.data)
        .subscribe(
          (result: DutyType) => {
            event.data.id = result.id;
            this.alertService.success(`Dienst '${event.data.name}' gespeichert.`);
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
    event.data = Object.assign({}, event.oldData, event.newData);
    console.log(event.data);
    this.rowInsert(event);
  }

  rowDelete(event) {
    event.cancel = new Promise((resolve, reject) => {
      this.dutyTypeService.delete(event.data.id)
        .subscribe(
          () => {
            this.alertService.success(`Dienst '${event.data.name}' gelöscht`);
            resolve(false);
          },
          error => {
            console.log(error);
            this.alertService.error(error._body);
            resolve(true);
          });
    });
  }

  setColorBoxValue(args, cellInfo) {
    console.log(args);
    cellInfo.setValue(args.value);
  }
}
