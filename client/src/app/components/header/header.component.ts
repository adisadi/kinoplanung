import { Component, OnInit, NgZone } from '@angular/core';
import { AuthCommonService, Roles } from '../../services/auth-common.service';
import { TenantCommonService } from '../../services/tenant-common.service';
import { Router, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  IsAuthenticated: boolean = false;
  Role: Roles = Roles.NotAuthenticated;

  tenantBoxOptions: any = {
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

  origin_items: any[] = [
    { name: "tenantBox", role: "Auth", location: "before", widget: "dxSelectBox", locateInMenu: "auto", options: this.tenantBoxOptions, visible: true },
    { name: "header", role: "", location: "center", text: "Kinoplanung", locateInMenu: "never", visible: true },
    { name: "home", role: "Admin", locateInMenu: "always", widget: "dxButton", options: { text: "Home", link: "/", icon: "home" }, visible: true },
    { name: "tenants", role: "Admin", locateInMenu: "always", widget: "dxButton", options: { text: "Mandanten", link: "/tenants", beginGroup: "true", icon: "toolbox" }, visible: true },
    { name: "users", role: "Admin", locateInMenu: "always", widget: "dxButton", options: { text: "Benutzer", link: "/users", icon: "toolbox" }, visible: true },
    { name: "functions", role: "Admin", locateInMenu: "always", widget: "dxButton", options: { text: "Funktionen", link: "/functions", beginGroup: "true", icon: "toolbox" }, visible: true },
    { name: "dutytypes", role: "Admin", locateInMenu: "always", widget: "dxButton", options: { text: "Dienste", link: "/dutytypes", icon: "toolbox" }, visible: true },
    { name: "logout", role: "Auth", locateInMenu: "always", widget: "dxButton", options: { text: "LogOut", link: "/login", beginGroup: "true", icon: "runner" }, visible: true }
  ];

  items: any[] = [];
  build_items: any[];

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

    this.tenantCommonService.OnTenantsChange().subscribe(() => {
      this.loadData(this.IsAuthenticated);
    });
  }

  onTenantChange(tenantId: any) {
    this.tenantCommonService.setCurrentTenant(this.tenantBoxOptions.items.find(t => t.id === tenantId));
  }

  IsAdmin(): boolean {
    return this.Role === Roles.Administrator;
  }

  async loadData(loggedin) {
    this.IsAuthenticated = loggedin;
    this.Role = loggedin === true ? this.authCommonService.GetUserRole() : Roles.NotAuthenticated;

    this.build_items = this.origin_items.map(x => {
      let n = Object.assign({}, x);
      if (n.options && n.widget === "dxButton")
        n.options.onClick = () => { this.itemClick(n.options.link) };
      return n;
    });

    if (loggedin === true) {
      let tenants: any[] = [];
      try {
        tenants = await this.tenantCommonService.getAll().toPromise();
      } catch (error) {
        console.log(error);
        /* if (error.status === 401) {
          console.log("401:"+ this.router.url);
          this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
        } */
      }

      this.tenantBoxOptions.items = tenants;
      if (tenants && tenants.length > 0) {
        this.tenantBoxOptions.value = this.tenantCommonService.getCurrentTenant(tenants[0]).id;
      }
      this.build_items.find(s => s.name === "tenantBox").options = this.tenantBoxOptions;

      if (this.Role === Roles.Administrator) {
        this.build_items.filter(s => s.role === "Admin").forEach(s => s.visible = true);
        this.build_items.filter(s => s.role === "Auth").forEach(s => s.visible = true);
      }
      else {
        this.build_items.filter(s => s.role === "Admin").forEach(s => s.visible = false);
        this.build_items.filter(s => s.role === "Auth").forEach(s => s.visible = true);
      }
    } else {
      this.tenantBoxOptions.items = [];
      this.build_items.filter(s => s.role === "Admin").forEach(s => s.visible = false);
      this.build_items.filter(s => s.role === "Auth").forEach(s => s.visible = false);
    }

    this.items = this.build_items;
    console.log({ IsAuthenticated: this.IsAuthenticated, Role: this.Role });
  }

  itemClick(data) {
    console.log(data);
    this.router.navigateByUrl(data);
  }

}
