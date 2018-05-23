import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';

import { DxFormComponent } from 'devextreme-angular';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild(DxFormComponent) myform: DxFormComponent;

  model: any = { Username: "", Password: "" };
  loading = false;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthentificationService,
    private alertService:AlertService
  ) { }

  ngOnInit() {
    console.log('init');
    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {

    let result = this.myform.instance.validate();
    if (result.isValid) {
      this.loading = true;

      this.authenticationService.login(this.model.Username, this.model.Password)
        .subscribe(
          data => {
            this.router.navigate([this.returnUrl]);
          },
          error => {
            console.log(error);
            this.alertService.warning("Username or password is incorrect");
            this.loading = false;
          });
    }
  }
}


