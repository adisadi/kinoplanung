import { Component, OnInit } from '@angular/core';
import { FunctionsService } from '../services/functions.service';
import { AlertService } from '../../../services/alert.service';

import DataSource from 'devextreme/data/data_source';

@Component({
  selector: 'app-functions-grid',
  templateUrl: './functions-grid.component.html',
  styleUrls: ['./functions-grid.component.css']
})
export class FunctionsGridComponent implements OnInit {

  constructor(private functionsService: FunctionsService, private alertService: AlertService) { }

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
    event.data = Object.assign({},event.oldData,event.newData);
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
