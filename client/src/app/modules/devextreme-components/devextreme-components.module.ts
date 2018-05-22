import { NgModule } from '@angular/core';

import {
  DxSchedulerModule,
  DxTemplateModule,
  DxResponsiveBoxModule,
  DxToolbarModule,
  DxSelectBoxModule
} from 'devextreme-angular';


@NgModule({
  imports: [
    DxSchedulerModule,
    DxTemplateModule,
    DxResponsiveBoxModule,
    DxToolbarModule,
    DxSelectBoxModule
  ],
  exports:[
    DxSchedulerModule,
    DxTemplateModule,
    DxResponsiveBoxModule,
    DxToolbarModule,
    DxSelectBoxModule
  ],
  declarations: []
})
export class DevextremeComponentsModule { }
