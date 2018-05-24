import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TenantsGridComponent } from './tenants-grid/tenants-grid.component';

const routes: Routes = [{ path: 'tenants', component: TenantsGridComponent, /* canActivate: [AuthGuard] */}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TenantsRoutingModule { }
