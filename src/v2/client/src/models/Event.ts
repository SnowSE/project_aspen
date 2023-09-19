
export interface Event {
  date: Date;
  title?: string;
  location?: string;
  description?: string;
  mainImage?: string;
  donationTarget: number;
  isArchived?: boolean;
  id: number;
}
