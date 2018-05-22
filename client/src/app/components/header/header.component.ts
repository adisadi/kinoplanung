import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  tenants: any[] = [{ text: "Mandant1", id: 1 }, { text: "Mandant2", id: 2 }, { text: "Mandant3", id: 3 }];

  tenantOptions: any = {
    width: 140,
    items: this.tenants,
    valueExpr: "id",
    displayExpr: "text",
    value: 3,
    onValueChanged: (args) => {
      this.onTenantChange(args.value);
    }
  };

  constructor() {

  }

  ngOnInit() {

  }

  onTenantChange(tenantId: number) {
    console.log(tenantId);
  }

}
