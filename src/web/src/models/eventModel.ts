export default class EventModel {
  date: Date;
  title: string;
  location: string;
  description: string;
  primaryImageUrl: string;
  id: number = -1;
  constructor(
    date?: Date,
    title?: string,
    location?: string,
    description?: string,
    primaryImageUrl?: string
  ) {
    this.title = title ?? "";
    this.date = date ?? new Date();
    this.location = location ?? "";
    this.description = description ?? "";
    this.primaryImageUrl = primaryImageUrl ?? "";
  }
}
