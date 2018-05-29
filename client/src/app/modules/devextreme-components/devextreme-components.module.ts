import { NgModule } from '@angular/core';

import {
  DxSchedulerModule,
  DxTemplateModule,
  DxResponsiveBoxModule,
  DxToolbarModule,
  DxSelectBoxModule,
  DxFormModule,
  DxFormComponent,
  DxButtonModule,
  DxTextBoxModule,
  DxLoadIndicatorModule,
  DxDataGridModule,
  DxColorBoxModule,
  DxDropDownBoxModule
} from 'devextreme-angular';


@NgModule({
  imports: [
    DxDropDownBoxModule,
    DxDataGridModule,
    DxSchedulerModule,
    DxTemplateModule,
    DxResponsiveBoxModule,
    DxToolbarModule,
    DxSelectBoxModule,
    DxButtonModule,
    DxTextBoxModule,
    DxLoadIndicatorModule,
    DxColorBoxModule,
    DxFormModule
  ],
  exports:[
    DxDropDownBoxModule,
    DxDataGridModule,
    DxSchedulerModule,
    DxTemplateModule,
    DxResponsiveBoxModule,
    DxToolbarModule,
    DxSelectBoxModule,
    DxButtonModule,
    DxTextBoxModule,
    DxLoadIndicatorModule,
    DxColorBoxModule,
    DxFormModule
  ],
  declarations: []
})
export class DevextremeComponentsModule { }
