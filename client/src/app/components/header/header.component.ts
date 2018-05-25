import { Component, OnInit, NgZone } from '@angular/core';
import { AuthCommonService, Roles } from '../../services/auth-common.service';
import { TenantCommonService } from '../../services/tenant-common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  IsAuthenticated: boolean = false;
  Role: Roles = Roles.NotAuthenticated;

  adminMenuItems: any[] = [
    { text: "Home", link: "/", icon: "home" },
    { text: "Mandanten", link: "/tenants", beginGroup: "true", icon: "toolbox" },
    { text: "Benutzer", link: "/users",  icon: "toolbox" },
    { text: "Funktionen", link: "/functions", beginGroup: "true", icon: "toolbox" },
    { text: "Dienste", link: "/dutytypes", icon: "toolbox" },
    { text: "LogOut", link: "/login", beginGroup: "true", icon: "runner" }
  ];

  otherMenuItems: any[] = [
    { text: "LogOut", link: "/login", icon: "runner" }
  ];

  tenantOptions: any = {
    width: 200,
    items: [],
    valueExpr: "id",
    displayExpr: "name",
    value: 3,
    onValueChanged: (args) => {
      console.log(args);
      this.onTenantChange(args.value);
    }
  };

  manageOptions: any = {
    hideSubmenuOnMouseLeave:true,
    items: [],
    orientation: "vertical",
    onItemClick: (data) => {
      this.itemClick(data);
    }
  }

  constructor(private authCommonService: AuthCommonService,
    private tenantCommonService: TenantCommonService,
    private ngZone: NgZone, private router: Router) {

  }

  ngOnInit() {

    this.loadData(this.authCommonService.IsAuthenticated());
    console.log('ngOnInit:' + JSON.stringify({ IsAuthenticated: this.IsAuthenticated, Role: this.Role }));

    this.authCommonService.IsLoggedIn().subscribe((logedin: boolean) => {
      this.ngZone.run(() => {
        this.loadData(logedin);
      });
    });
  }

  onTenantChange(tenantId: any) {
    this.tenantCommonService.setCurrentTenant(this.tenantOptions.items.find(t => t.id === tenantId));
  }

  IsAdmin(): boolean {
    return this.Role === Roles.Administrator;
  }

  loadData(loggedin) {
    this.IsAuthenticated = loggedin;
    this.Role = loggedin === true ? this.authCommonService.GetUserRole() : Roles.NotAuthenticated;
    if (loggedin === true) {
      this.tenantCommonService.getAll().toPromise().then((data) => {
        this.tenantOptions.items = data;
        if (data && data.length > 0) {
          this.tenantOptions.value = this.tenantCommonService.getCurrentTenant(data[0]).id;
        }
      });
      if (this.Role === Roles.Administrator) {
        this.manageOptions.items = this.adminMenuItems;
      }
      else {
        this.manageOptions.items = this.otherMenuItems;
      }
    } else {
      console.log("empty");
      this.tenantOptions.items = [];
    }
    console.log({ IsAuthenticated: this.IsAuthenticated, Role: this.Role });
  }

  itemClick(data) {
    console.log(data);
    this.router.navigateByUrl(data.itemData.link);
  }

}
