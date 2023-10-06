export interface Team {
  id: number;
  description: string;
  mainImage: string;
  ownerId: number;
  eventId: number;
  name: string;
  donationTarget: number;
  isArchived: boolean;
  welcomeMessage: string;
}