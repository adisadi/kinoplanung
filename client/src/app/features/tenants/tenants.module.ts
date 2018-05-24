import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {DevextremeComponentsModule} from '../../modules/devextreme-components/devextreme-components.module';

import { TenantsRoutingModule } from './tenants-routing.module';
import { TenantsGridComponent } from './tenants-grid/tenants-grid.component';
import { TenantService } from './services/tenant.service';

@NgModule({
  imports: [
    CommonModule,
    DevextremeComponentsModule,
    TenantsRoutingModule
  ],
  declarations: [TenantsGridComponent],
  providers:[TenantService]

})
export class TenantsModule { }
