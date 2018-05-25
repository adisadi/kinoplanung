import { Component, OnInit, NgZone } from '@angular/core';
import { FunctionsService } from '../services/functions.service';
import { AlertService } from '../../../services/alert.service';

import DataSource from 'devextreme/data/data_source';
import { TenantCommonService } from '../../../services/tenant-common.service';

@Component({
  selector: 'app-functions-grid',
  templateUrl: './functions-grid.component.html',
  styleUrls: ['./functions-grid.component.css']
})
export class FunctionsGridComponent implements OnInit {

  constructor(private functionsService: FunctionsService,
    private alertService: AlertService,
    private tenantCommonService: TenantCommonService,
    private ngZone: NgZone) { }

  dataSource: any = [];
  groupCaption: string = "Funktionen";
  ngOnInit() {
    this.tenantCommonService.CurrentTenant().subscribe(tenant => {
      //this.ngZone.run(() => {
        console.log("loaddata");
        this.loadData(tenant);
      //});
    });
    this.loadData(this.tenantCommonService.getCurrentTenant(null));
  }

  loadData(tenant) {
    this.groupCaption = `Funktionen für Mandant ${tenant.name}`; 
    this.functionsService.getAll()
      .subscribe(
        data => {
         /*  this.groupCaption = `Funktionen für Mandant ${tenant.name}`;  */
          this.dataSource = data;      
        },
        error => {
          console.log(error);
          this.alertService.error(error._body);
        });
  }

  rowInsert(event) {
    event.cancel = new Promise((resolve, reject) => {
      this.functionsService.save(event.data)
        .subscribe(
          (result) => {
            event.data.id = result.new_id;
            this.alertService.success(`Funktion '${event.data.name}' gespeichert.`);
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
      this.functionsService.delete(event.data.id)
        .subscribe(
          () => {
            this.alertService.success(`Funktion '${event.data.name}' gelöscht`);
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
