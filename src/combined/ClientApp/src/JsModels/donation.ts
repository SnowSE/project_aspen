export default class Donation {
  id?: number;
  personID?: number;
  date: string;
  amount: number;
  isPending: boolean;

  constructor(
    date: string,
    amount: number,
    personID?: number
  ) {
    this.personID = personID ?? undefined;
    this.date = date;
    this.amount = amount;
    this.isPending = false;
    this.id = undefined;
  }
}
