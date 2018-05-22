import { Component } from '@angular/core';

import { locale, loadMessages } from 'devextreme/localization';
import 'devextreme-intl';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {
    locale('de');
  }

  screen(width) {
    return (width < 700) ? 'sm' : 'lg';
  }
}
