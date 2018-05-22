import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {OverviewModule} from './features/overview/overview.module';

import {DevextremeComponentsModule} from './modules/devextreme-components/devextreme-components.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DevextremeComponentsModule,
    OverviewModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
