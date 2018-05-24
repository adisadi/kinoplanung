import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DutyTypesGridComponent } from './dutytypes-grid/dutytypes-grid.component';

const routes: Routes = [{ path: 'dutytypes', component: DutyTypesGridComponent, /* canActivate: [AuthGuard] */}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DutyTypesRoutingModule { }
