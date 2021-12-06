export default class Team {
  id: number;
  name: string;
  description: string;
  mainImage: string;
  ownerID: number;
  eventID: number;
  donationTarget: number;
  constructor(
    name: string,
    description: string,
    mainImage: string,
    owenerId: number,
    eventId: number,
    id?: number,
    donationTarget?: number
  ) {
    this.id = id ?? -1;
    this.name = name ?? "";
    this.description = description ?? "";
    this.mainImage = mainImage ?? "";
    this.ownerID = owenerId ?? -1;
    this.eventID = eventId ?? -1;
    this.donationTarget = donationTarget ?? 0;
  }
}
