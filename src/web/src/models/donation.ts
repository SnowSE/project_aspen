export default class Donation {
    eventID: number;
    teamID: number;
    personID: number;
    date: Date;
    amount: number;

    constructor(
        eventID: number,
    teamID: number,
    personID: number,
    date: Date,
    amount: number,
    ){
        this.eventID = eventID ?? "";
        this.teamID = teamID ?? "";
        this.personID = personID ?? "";
        this.date = date ?? new Date();
        this.amount = amount ?? 0; 
    }
}