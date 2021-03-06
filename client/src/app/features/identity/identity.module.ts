import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevextremeComponentsModule } from '../../modules/devextreme-components/devextreme-components.module';

import { IdentityRoutingModule } from './identity-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { AuthentificationService } from './services/authentification.service';
import { UserService } from './services/user.service';
import { UsersComponent } from './users/users.component';

@NgModule({
  imports: [
    CommonModule,
    DevextremeComponentsModule,
    IdentityRoutingModule
  ],
  declarations: [LoginComponent, RegisterComponent, UsersComponent],
  providers: [AuthentificationService, UserService]
})
export class IdentityModule { }
