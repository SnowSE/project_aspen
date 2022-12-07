import axios from 'axios'
import { AspenEvent } from '../../interfaces';


const BaseUrl = process.env.PUBLIC_URL


const config = {
  headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
};


export const EventsService = {
    GetEventViaAxios: async (id: number): Promise<AspenEvent[]> => {
        const res = await axios.get(`${BaseUrl}/api/events/${id}`);
        return res.data;
    },
    GetEventsViaAxios: async (): Promise<AspenEvent[]> => {
        const res = await axios.get(`${BaseUrl}/api/events`);
        return res.data;
    },
    CreateEventViaAxios: async (newEvent: AspenEvent): Promise<any> => {
        const res = await axios.post(`${BaseUrl}/api/events`, newEvent, config);
        return res.data;
    },
    UpdateEventViaAxios: async (updateEvent: AspenEvent): Promise<any> => {
        const res = await axios.put(`${BaseUrl}/api/events`, updateEvent, config);
        return res.data;
    },
    DeleteEventViaAxious: async (id: number): Promise<AspenEvent[]> => {
        const res = await axios.delete(`${BaseUrl}/api/events/${id}`, config);
        return res.data;
    }
};

