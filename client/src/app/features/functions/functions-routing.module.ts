import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FunctionsGridComponent } from './functions-grid/functions-grid.component';

const routes: Routes = [{ path: 'functions', component: FunctionsGridComponent, /* canActivate: [AuthGuard] */}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FunctionsRoutingModule { }
