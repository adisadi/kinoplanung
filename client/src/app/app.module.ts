import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { AppConfig } from './app.config';

import { AuthGuard } from './guards/auth.guard';

import { AlertService } from './services/alert.service';

import { IdentityModule } from './features/identity/identity.module';
import { OverviewModule } from './features/overview/overview.module';
import { TenantsModule } from './features/tenants/tenants.module';
import { FunctionsModule } from './features/functions/functions.module';
import { DutyTypesModule } from './features/dutytypes/dutytypes.module';

import { DevextremeComponentsModule } from './modules/devextreme-components/devextreme-components.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AlertComponent } from './components/alert/alert.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    DevextremeComponentsModule,
    IdentityModule,
    OverviewModule,
    TenantsModule,
    FunctionsModule,
    DutyTypesModule
  ],
  providers: [AppConfig, AuthGuard, AlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
