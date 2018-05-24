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
  DxColorBoxModule
} from 'devextreme-angular';


@NgModule({
  imports: [
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
