import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {DevextremeComponentsModule} from '../../modules/devextreme-components/devextreme-components.module';

import { OverviewRoutingModule } from './overview-routing.module';

import { AppointmentService } from './services/appointment.service';

import { OverviewComponent } from './overview/overview.component';

@NgModule({
  imports: [
    CommonModule,
    OverviewRoutingModule,
    DevextremeComponentsModule
  ],
  declarations: [OverviewComponent],
  providers: [AppointmentService]
})
export class OverviewModule { }
