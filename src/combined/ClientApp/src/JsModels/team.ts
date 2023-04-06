import Person from "./person"

export default class Team {
  id?: number;
  name: string;
  description: string;
  mainImage: string;
  ownerID: number;
  eventID: number;
  donationTarget: number;
  isArchived: boolean;
  WelcomeMessage: string;
  persons?: Person[];

  constructor(
    name: string,
    description: string,
    mainImage: string,
    owenerId: number,
    eventId: number,
    id: number,
    donationTarget: number,
    isArchived: boolean,
    WelcomeMessage: string,

     persons: Person[],

  ) {
    this.id = id ?? -1;
    this.name = name;
    this.description = description;
    this.WelcomeMessage = WelcomeMessage;
    this.mainImage = mainImage;
    this.ownerID = owenerId;
    this.eventID = eventId;
    this.donationTarget = donationTarget;
      this.persons = [];
      this.isArchived = isArchived;

  }
}
