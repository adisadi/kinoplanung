import { Component, OnInit } from '@angular/core';

import { AppointmentService, FunctionModel, DutyTypeModel, UserModel, DutyModel } from '../services/appointment.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  dutiesData: DutyModel[];
  currentDate: Date = new Date(2015, 4, 25);
  functionsData: FunctionModel[];
  dutyTypeData: DutyTypeModel[];
  userData: UserModel[];

  constructor(service: AppointmentService) {
    this.dutiesData = service.getDuties();
    this.functionsData = service.getFunctions();
    this.dutyTypeData = service.getDutyTypes();
    this.userData = service.getUsers();
  }

  ngOnInit() {
  }

  getUser(id: string) {
    return this.userData.find(u => u.id === id);
  }

  getFunction(id: number) {
    return this.functionsData.find(u => u.id === id);
  }

  getDutyType(id: number) {
    return this.dutyTypeData.find(u => u.id === id);
  }

  onAppointmentFormCreated(data) {
    var that = this;
    let form = data.form;
    let duty: DutyModel = data.appointmentData;





    form.option("items", [
      {
        dataField: "startDate",
        editorType: "dxDateBox",
        editorOptions: {
          width: "100%",
          type: "datetime",
        }
      },
      {
        dataField: "endDate",
        editorType: "dxDateBox",
        editorOptions: {
          width: "100%",
          type: "datetime"
        }
      },
      {
        label: {
          text: "Dienst"
        },
        editorType: "dxSelectBox",
        dataField: "dutyTypeId",
        editorOptions: {
          items: that.dutyTypeData,
          displayExpr: "name",
          valueExpr: "id",
        }
      },
      {
        label: {
          text: "Funktion"
        },
        editorType: "dxSelectBox",
        dataField: "functionId",
        editorOptions: {
          items: that.functionsData,
          displayExpr: "name",
          valueExpr: "id",
        }
      },
      {
        label: {
          text: "Staff"
        },
        editorType: "dxSelectBox",
        dataField: "userId",
        editorOptions: {
          items: that.userData,
          displayExpr: "name",
          valueExpr: "id",
        }
      },

    ]);
  }

}
