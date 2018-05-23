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
  DxLoadIndicatorModule
} from 'devextreme-angular';


@NgModule({
  imports: [
    DxSchedulerModule,
    DxTemplateModule,
    DxResponsiveBoxModule,
    DxToolbarModule,
    DxSelectBoxModule,
    DxButtonModule,
    DxTextBoxModule,
    DxLoadIndicatorModule,
    DxFormModule
  ],
  exports:[
    DxSchedulerModule,
    DxTemplateModule,
    DxResponsiveBoxModule,
    DxToolbarModule,
    DxSelectBoxModule,
    DxButtonModule,
    DxTextBoxModule,
    DxLoadIndicatorModule,
    DxFormModule
  ],
  declarations: []
})
export class DevextremeComponentsModule { }
