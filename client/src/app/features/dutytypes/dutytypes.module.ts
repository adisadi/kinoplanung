import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {DevextremeComponentsModule} from '../../modules/devextreme-components/devextreme-components.module';

import { DutyTypesRoutingModule } from './dutytypes-routing.module';
import { DutyTypesGridComponent } from './dutytypes-grid/dutytypes-grid.component';
import { DutyTypesService } from './services/dutytypes.service';

@NgModule({
  imports: [
    CommonModule,
    DevextremeComponentsModule,
    DutyTypesRoutingModule
  ],
  declarations: [DutyTypesGridComponent],
  providers:[DutyTypesService]

})
export class DutyTypesModule { }
