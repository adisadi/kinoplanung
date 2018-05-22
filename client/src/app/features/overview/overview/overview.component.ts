import { Component, OnInit } from '@angular/core';

import { Appointment,Priority, AppointmentService } from '../services/appointment.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  appointmentsData: Appointment[];
  currentDate: Date = new Date(2015, 4, 25);
  prioritiesData: Priority[];

  constructor(service: AppointmentService) {
    this.appointmentsData = service.getAppointments();
    this.prioritiesData = service.getPriorities();
  }

  ngOnInit() {
  }

}
