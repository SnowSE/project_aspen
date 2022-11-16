export default class EventModel {
  date: Date;
  title: string;
  location: string;
  description: string;
  mainImage: string;
  donationTarget: number;
  id: number = -1;
  constructor(
    date: Date,
    location: string,
    description: string,
    mainImage: string,
    title: string,
    donationTarget?: number
  ) {
    this.date = date ?? new Date();
    this.title = title ?? "";
    this.location = location ?? "";
    this.description = description ?? "";
    this.mainImage = mainImage ?? "";
    this.title = title ?? '';
    this.donationTarget = donationTarget ?? 0;
  }
}
