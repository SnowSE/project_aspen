export default class EventModel {
  date: Date;
  title: string;
  location: string;
  description: string;
  primaryImageUrl: string;
  donationTarget: number;
  ID: number = -1;
  constructor(
    date?: Date,
    location?: string,
    description?: string,
    primaryImageUrl?: string,
    title?: string,
    donationTarget?: number
  ) {
    this.date = date ?? new Date();
    this.title = title ?? "";
    this.location = location ?? "";
    this.description = description ?? "";
    this.primaryImageUrl = primaryImageUrl ?? "";
    this.title = title ?? '';
    this.donationTarget = donationTarget ?? 0;
  }
}
