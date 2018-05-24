import { Component, OnInit } from '@angular/core';
import { DutyTypesService } from '../services/dutytypes.service';
import { AlertService } from '../../../services/alert.service';

import DataSource from 'devextreme/data/data_source';

@Component({
  selector: 'app-dutytypes-grid',
  templateUrl: './dutytypes-grid.component.html',
  styleUrls: ['./dutytypes-grid.component.css']
})
export class DutyTypesGridComponent implements OnInit {

  constructor(private functionsService: DutyTypesService, private alertService: AlertService) { }

  tenants: any = [];
  dataSource: any = [];

  ngOnInit() {
    this.functionsService.getAllTenants().toPromise()
      .then(
        data => {
          this.tenants = data;
          this.functionsService.getAll()
            .subscribe(
              data => {
                this.dataSource = data;
              },
              error => {
                console.log(error);
                this.alertService.error(error._body);
              });
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
      this.functionsService.delete(event.data.id)
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
