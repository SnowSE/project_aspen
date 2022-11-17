export default class EventModel {
  date: Date;
  title: string;
  location: string;
  description: string;
  mainImage: string;
  id: number;
  constructor(
    date: Date,
    title: string,
    location: string,
    description: string,
    mainImage: string,
    id: number

  ) {
    this.title = title ?? "";
    this.date = date ?? new Date();
    this.location = location ?? "";
    this.description = description ?? "";
    this.mainImage = mainImage ?? "";
    this.id = id ?? -1;
  }
}
