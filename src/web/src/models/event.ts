export default class EventModel {
  date: Date;
  location: string;
  description: string;
  primaryImageUrl: string;
  ID: number = -1;
  constructor(
    date: Date,
    location: string,
    description: string,
    primaryImageUrl: string
  ) {
    this.date = date ?? null;
    this.location = location ?? "";
    this.description = description ?? "";
    this.primaryImageUrl = primaryImageUrl ?? "";
  }
}
