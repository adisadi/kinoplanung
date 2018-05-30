import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AlertService } from '../../../services/alert.service';
import { TenantCommonService } from '../../../services/tenant-common.service';
import CustomStore from 'devextreme/data/custom_store';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  dataSource: any = [];
  gridDataSource: CustomStore = null;
  tenantDataSource: any[] = [];
  roles: any = [{ Name: "Administrator" }, { Name: "Manager" }, { Name: "Member" }];
  _gridBoxValue: number[] = [3];
  constructor(private userService: UserService, private alertService: AlertService, private tenantCommonService: TenantCommonService) { }

  ngOnInit() {
    this.userService.getAll()
      .subscribe(
        data => {
          console.log(data);
          this.dataSource = data;
        },
        error => {
          console.log(error);
          this.alertService.error(error._body);
        });

    this.gridDataSource = new CustomStore({
      loadMode: "raw",
      key: "id",
      load: () => {
        return this.tenantCommonService.getAll().toPromise().then((data) => {
          this.tenantDataSource = data;
          return data;
        });
      }
    });
  }

  get gridBoxValue(): number[] {
    return this._gridBoxValue;
  }

  set gridBoxValue(value: number[]) {
    console.log('gridBoxValue:' + JSON.stringify(value));
    this._gridBoxValue = value || [];
  }

  onValueChanged(event,cell){
    console.log('onValueChanged:'+ JSON.stringify(event.value));
    console.log('onValueChanged:'+ JSON.stringify(cell.value));
    cell.setValue(cell.value);
  }

  onClosed(event,data){
    console.log('onClosed:' + + data.value);
  }

  getTenantsAsString(value) {
    let v: string = "";
    for (let t of value) {
      v += this.tenantDataSource.find(te => te.id === t).name + ","
    }
    if (v.length > 0) {
      v = v.substring(0, v.length - 1);
    }
    return v;
  }

  rowInsert(event) {
    console.log(event.data);
    event.cancel = new Promise((resolve, reject) => {
      this.userService.save(event.data)
        .subscribe(
          (result) => {
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
    console.log(event.data);
    event.cancel = new Promise((resolve, reject) => {
      this.userService.delete(event.data.id)
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

}
