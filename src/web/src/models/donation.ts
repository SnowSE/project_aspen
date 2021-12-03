export default class Donation {
  eventID?: number;
  teamID?: number;
  personID?: number;
  date: string;
  amount: number;

  constructor(
    date: string,
    amount: number,
    eventID?: number,
    teamID?: number,
    personID?: number
  ) {
    this.eventID = eventID;
    this.teamID = teamID;
    this.personID = personID;
    this.date = date ?? new Date().toString;
    this.amount = amount ?? 0;
  }
}
