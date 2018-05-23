import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';

import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alertService.getMessage().subscribe(message => {
      if (message) {
        notify({
          message: message.text,
          closeOnClick:true,
          /* position: {
            my: "center top",
            at: "center top"
          } */
        }, message.type, 3000);
      }
    });

  }

}
