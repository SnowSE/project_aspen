export default class Donation {
  id: number;
  eventID: number;
  teamID?: number;
  personID?: number;
  date: string;
  amount: number;
  isPledge: boolean;

  constructor(
    eventID: number,
    date: string,
    amount: number,
    teamID?: number,
    personID?: number
  ) {
    this.eventID = eventID;
    this.teamID = teamID;
    this.personID = personID ?? undefined;
    this.date = date;
    this.amount = amount;
    this.isPledge = false;
    this.id = undefined;
  }
}
