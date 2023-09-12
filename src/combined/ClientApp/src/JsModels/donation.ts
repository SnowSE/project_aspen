export default class Donation {
  id?: number;
  teamID?: number;
  personID?: number;
  date: string;
  amount: number;
  isPending: boolean;

  constructor(
    date: string,
    amount: number,
    teamID?: number,
    personID?: number
  ) {
    this.teamID = teamID;
    this.personID = personID ?? undefined;
    this.date = date;
    this.amount = amount;
    this.isPending = false;
    this.id = undefined;
  }
}
