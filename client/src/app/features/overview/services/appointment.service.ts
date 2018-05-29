import { Injectable } from '@angular/core';

export class DutyModel {
    id:number;
    startDate: Date;
    endDate: Date;
    dutyTypeId:number;
    functionId:number;
    userId:string;
    comment:string;
}

export class FunctionModel {
    name: string;
    id: number;
}

export class DutyTypeModel {
    name: string;
    id: number;
    color: string;
}

export class UserModel {
    constructor(id,firstname,lastname){
        this.id=id;
        this.firstname=firstname;
        this.lastname=lastname;
    }
    id: string;
    firstname: string;
    lastname: string;

    get name():string {
        return this.firstname+" " + this.lastname;
    }
}

let duties: DutyModel[] = [
    {
        id:1,
        comment: "Website Re-Design Plan",
        dutyTypeId: 2,
        functionId:1,
        userId:"1",
        startDate: new Date(2015, 4, 25, 9, 0),
        endDate: new Date(2015, 4, 25, 11, 30)
    }, {
        id:2,
        comment: "Book Flights to San Fran for Sales Trip",
        dutyTypeId: 2,
        functionId:1,
        userId:"1",
        startDate: new Date(2015, 4, 25, 12, 0),
        endDate: new Date(2015, 4, 25, 13, 0)
    }, {
        id:3,
        comment: "Install New Router in Dev Room",
        dutyTypeId: 1,
        functionId:1,
        userId:"1",
        startDate: new Date(2015, 4, 25, 14, 30),
        endDate: new Date(2015, 4, 25, 15, 30)
    }, {
        id:4,
        comment: "Approve Personal Computer Upgrade Plan",
        dutyTypeId: 1,
        functionId:1,
        userId:"1",
        startDate: new Date(2015, 4, 26, 10, 0),
        endDate: new Date(2015, 4, 26, 11, 0)
    }, {
        id:5,
        comment: "Final Budget Review",
        dutyTypeId: 2,
        functionId:1,
        userId:"1",
        startDate: new Date(2015, 4, 26, 12, 0),
        endDate: new Date(2015, 4, 26, 13, 35)
    }, {
        id:6,
        comment: "New Brochures",
        dutyTypeId: 2,
        functionId:1,
        userId:"1",
        startDate: new Date(2015, 4, 26, 14, 30),
        endDate: new Date(2015, 4, 26, 15, 45)
    }, {
        id:7,
        comment: "Install New Database",
        dutyTypeId: 1,
        functionId:1,
        userId:"1",
        startDate: new Date(2015, 4, 27, 9, 45),
        endDate: new Date(2015, 4, 27, 11, 15)
    }, {
        id:8,
        comment: "Approve New Online Marketing Strategy",
        dutyTypeId: 2,
        functionId:1,
        userId:"1",
        startDate: new Date(2015, 4, 27, 12, 0),
        endDate: new Date(2015, 4, 27, 14, 0)
    }, {
        id:9,
        comment: "Upgrade Personal Computers",
        dutyTypeId: 1,
        functionId:1,
        userId:"1",
        startDate: new Date(2015, 4, 27, 15, 15),
        endDate: new Date(2015, 4, 27, 16, 30)
    }, {
        id:10,
        comment: "Prepare 2015 Marketing Plan",
        dutyTypeId: 2,
        functionId:1,
        userId:"1",
        startDate: new Date(2015, 4, 28, 11, 0),
        endDate: new Date(2015, 4, 28, 13, 30)
    }, {
        id:11,
        comment: "Brochure Design Review",
        dutyTypeId: 1,
        functionId:1,
        userId:"1",
        startDate: new Date(2015, 4, 28, 14, 0),
        endDate: new Date(2015, 4, 28, 15, 30)
    }, {
        id:12,
        comment: "Create Icons for Website",
        dutyTypeId: 2,
        functionId:1,
        userId:"1",
        startDate: new Date(2015, 4, 29, 10, 0),
        endDate: new Date(2015, 4, 29, 11, 30)
    }, {
        id:13,
        comment: "Upgrade Server Hardware",
        dutyTypeId: 1,
        functionId:1,
        userId:"1",
        startDate: new Date(2015, 4, 29, 14, 30),
        endDate: new Date(2015, 4, 29, 16, 0)
    }, {
        id:14,
        comment: "Submit New Website Design",
        dutyTypeId: 2,
        functionId:1,
        userId:"1",
        startDate: new Date(2015, 4, 29, 16, 30),
        endDate: new Date(2015, 4, 29, 18, 0)
    }, {
        id:15,
        comment: "Launch New Website",
        dutyTypeId: 2,
        functionId:1,
        userId:"1",
        startDate: new Date(2015, 4, 29, 12, 20),
        endDate: new Date(2015, 4, 29, 14, 0)
    }
];

let FunctionData: FunctionModel[] = [
    {
        name: "Function 1",
        id: 1,
    }, {
        name: "Function 2",
        id: 2,
    }
];

let DutyTypeData: DutyTypeModel[] = [
    {
        name: "DutyType 1",
        id: 1,
        color: "#1e90ff"
    }, {
        name: "DutyType 2",
        id: 2,
        color: "#ff9747"
    }
];

let UserData: UserModel[] = [
     new UserModel("1","firstname 1", "lastname 1"),
     new UserModel("2","firstname 2", "lastname 2"),
];

@Injectable({
    providedIn: 'root'
})
export class AppointmentService {

    constructor() { }

    getDuties() {
        return duties;
    }
    getFunctions() {
        return FunctionData;
    }
    getDutyTypes() {
        return DutyTypeData;
    }

    getUsers(){
        return UserData;
    }
}
