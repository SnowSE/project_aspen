import axios from 'axios'
import { AspenEvent } from '../../interfaces';


const BaseUrl = process.env.REACT_APP_BASE_URL


const config = {
  headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
};


export const EventsService = {

    GetEventsViaAxios: async (): Promise<AspenEvent[]> => {
        const res = await axios.get(`${BaseUrl}/api/events`);
        return res.data;
      },
    CreateEventViaAxios: async (newEvent:AspenEvent): Promise<any> => {
        const res = await axios.post(`${BaseUrl}/api/events`, newEvent, config);
        return res.data;
      }
};

