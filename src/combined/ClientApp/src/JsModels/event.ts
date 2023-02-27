export default class Event {
  date: Date;
  title: string;
  location: string;
  description: string;
  mainImage: string;
    donationTarget: number;
    isArchived: boolean;

  id?: number;
  constructor(
    date: Date,
    location: string,
    description: string,
    mainImage: string,
    title: string,
      donationTarget: number,
      isArchived: boolean,

    id: number
  ) {
    this.date = date ?? new Date();
    this.title = title ?? "";
    this.location = location ?? "";
    this.description = description ?? "";
    this.mainImage = mainImage ?? "";
    this.title = title ?? '';
    this.donationTarget = donationTarget ?? 0;
      this.id = id ?? - 1;
      this.isArchived = false;
  }
}
