import axios from "axios"
import { Event } from "../../models/Event";
import { Donation } from "../../models/Donation";

export const homeService = {
  async getEvents(): Promise<Event[]> {
    const url = "/api/events"
    const response = await axios.get(url);
    return response.data
  },
  async getEventDonation(id: number): Promise<number> {
    const url = `/api/donations/event/${id}`
    const response = await axios.get(url);
    return response.data
  },
}