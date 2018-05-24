import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {DevextremeComponentsModule} from '../../modules/devextreme-components/devextreme-components.module';

import { FunctionsRoutingModule } from './functions-routing.module';
import { FunctionsGridComponent } from './functions-grid/functions-grid.component';
import { FunctionsService } from './services/functions.service';

@NgModule({
  imports: [
    CommonModule,
    DevextremeComponentsModule,
    FunctionsRoutingModule
  ],
  declarations: [FunctionsGridComponent],
  providers:[FunctionsService]

})
export class FunctionsModule { }
