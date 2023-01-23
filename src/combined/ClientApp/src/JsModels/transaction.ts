export default class Transaction {
    transactionNumber: string;
    eventID: number;
    teamID?: number;
    personID?: number;
    date: string;
    amount: number;
    phoneNumber?: string;
    email: string;
    name: string;
    
    constructor(
        transactionNumber: string,
        eventID: number,
        date: string,
        amount: number,
        email: string,
        name: string,
        phoneNumber?: string,
        teamID?: number,
        personID?: number,

    ) {

        this.transactionNumber = transactionNumber;
        this.email = email;
        this.name = name;
        this.eventID = eventID;
        this.teamID = teamID;
        this.personID = personID ?? undefined;
        this.phoneNumber = phoneNumber ?? undefined;
        this.date = date;
        this.amount = amount;

    }
}
