import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { AppConfig } from './app.config';

import { AuthGuard } from './guards/auth.guard';

import { AlertService } from './services/alert.service';
import { AuthCommonService } from './services/auth-common.service';
import { TenantCommonService } from './services/tenant-common.service';

import { IdentityModule } from './features/identity/identity.module';
import { OverviewModule } from './features/overview/overview.module';
import { TenantsModule } from './features/tenants/tenants.module';
import { FunctionsModule } from './features/functions/functions.module';
import { DutyTypesModule } from './features/dutytypes/dutytypes.module';

import { DevextremeComponentsModule } from './modules/devextreme-components/devextreme-components.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AlertComponent } from './components/alert/alert.component';
import { AuthErrorHandler } from './errorhandler/auth-error-handler';
import { JWTInterceptor } from './common/jwt-interceptor';
import { AuthErrorInterceptor } from './common/auth-error-interceptor';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    DevextremeComponentsModule,
    IdentityModule,
    OverviewModule,
    TenantsModule,
    FunctionsModule,
    DutyTypesModule
  ],
  providers: [AppConfig,
    AuthGuard,
    AuthCommonService,
    AlertService,
    TenantCommonService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JWTInterceptor,
      multi: true
    },
   /*  {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthErrorInterceptor,
      multi: true
    } */
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
