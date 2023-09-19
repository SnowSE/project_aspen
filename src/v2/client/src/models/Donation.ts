export interface Donation {
  id: number;
  eventID: number;
  teamID: number;
  personID: number;
  date: string;
  amount: number;
  isPending: boolean;
}