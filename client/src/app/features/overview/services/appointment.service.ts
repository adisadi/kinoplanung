import { Injectable } from '@angular/core';

export class Appointment {
    text: string;
    priorityId: number;
    startDate: Date;
    endDate: Date;
}

export class Priority {
    text: string;
    id: number;
    color: string;
}

let appointments: Appointment[] = [
    {
        text: "Website Re-Design Plan",
        priorityId: 2,
        startDate: new Date(2015, 4, 25, 9, 0),
        endDate: new Date(2015, 4, 25, 11, 30)
    }, {
        text: "Book Flights to San Fran for Sales Trip",
        priorityId: 2,
        startDate: new Date(2015, 4, 25, 12, 0),
        endDate: new Date(2015, 4, 25, 13, 0)
    }, {
        text: "Install New Router in Dev Room",
        priorityId: 1,
        startDate: new Date(2015, 4, 25, 14, 30),
        endDate: new Date(2015, 4, 25, 15, 30)
    }, {
        text: "Approve Personal Computer Upgrade Plan",
        priorityId: 2,
        startDate: new Date(2015, 4, 26, 10, 0),
        endDate: new Date(2015, 4, 26, 11, 0)
    }, {
        text: "Final Budget Review",
        priorityId: 2,
        startDate: new Date(2015, 4, 26, 12, 0),
        endDate: new Date(2015, 4, 26, 13, 35)
    }, {
        text: "New Brochures",
        priorityId: 2,
        startDate: new Date(2015, 4, 26, 14, 30),
        endDate: new Date(2015, 4, 26, 15, 45)
    }, {
        text: "Install New Database",
        priorityId: 1,
        startDate: new Date(2015, 4, 27, 9, 45),
        endDate: new Date(2015, 4, 27, 11, 15)
    }, {
        text: "Approve New Online Marketing Strategy",
        priorityId: 2,
        startDate: new Date(2015, 4, 27, 12, 0),
        endDate: new Date(2015, 4, 27, 14, 0)
    }, {
        text: "Upgrade Personal Computers",
        priorityId: 1,
        startDate: new Date(2015, 4, 27, 15, 15),
        endDate: new Date(2015, 4, 27, 16, 30)
    }, {
        text: "Prepare 2015 Marketing Plan",
        priorityId: 2,
        startDate: new Date(2015, 4, 28, 11, 0),
        endDate: new Date(2015, 4, 28, 13, 30)
    }, {
        text: "Brochure Design Review",
        priorityId: 1,
        startDate: new Date(2015, 4, 28, 14, 0),
        endDate: new Date(2015, 4, 28, 15, 30)
    }, {
        text: "Create Icons for Website",
        priorityId: 2,
        startDate: new Date(2015, 4, 29, 10, 0),
        endDate: new Date(2015, 4, 29, 11, 30)
    }, {
        text: "Upgrade Server Hardware",
        priorityId: 1,
        startDate: new Date(2015, 4, 29, 14, 30),
        endDate: new Date(2015, 4, 29, 16, 0)
    }, {
        text: "Submit New Website Design",
        priorityId: 2,
        startDate: new Date(2015, 4, 29, 16, 30),
        endDate: new Date(2015, 4, 29, 18, 0)
    }, {
        text: "Launch New Website",
        priorityId: 2,
        startDate: new Date(2015, 4, 29, 12, 20),
        endDate: new Date(2015, 4, 29, 14, 0)
    }
];

let prioritiesData: Priority[] = [
    {
        text: "Low Priority",
        id: 1,
        color: "#1e90ff"
    }, {
        text: "High Priority",
        id: 2,
        color: "#ff9747"
    }
];

@Injectable({
    providedIn: 'root'
})
export class AppointmentService {

    constructor() { }

    getAppointments() {
        return appointments;
    }
    getPriorities() {
        return prioritiesData;
    }
}
