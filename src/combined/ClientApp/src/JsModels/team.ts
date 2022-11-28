export default class Team {
  id: number;
  name: string;
  description: string;
  mainImage: string;
  ownerID: number;
  eventID: number;
  donationTarget: number;
  isPublic: boolean;
  constructor(
    name: string,
    description: string,
    mainImage: string,
    owenerId: number,
    eventId: number,
    id: number,
    donationTarget: number,
    isPublic: boolean,

  ) {
    this.id = id ?? -1;
    this.name = name;
    this.description = description;
    this.mainImage = mainImage;
    this.ownerID = owenerId;
    this.eventID = eventId;
    this.donationTarget = donationTarget;
    this.isPublic = isPublic;
  }
}
