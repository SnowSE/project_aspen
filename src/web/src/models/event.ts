export default class EventModel {
  date: Date;
  title: string;
  location: string;
  description: string;
  primaryImageUrl: string;
  ID: number = -1;
  constructor(
    date?: Date,
    title?: string,
    location?: string,
    description?: string,
    primaryImageUrl?: string
  ) {
    this.date = date ?? new Date();
    this.title = title ?? "";
    this.location = location ?? "";
    this.description = description ?? "";
    this.primaryImageUrl = primaryImageUrl ?? "";
  }
}
