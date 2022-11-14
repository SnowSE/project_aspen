import axios from 'axios'
import { AspenEvent } from '../../interfaces';

const BaseUrl = process.env.REACT_APP_BASE_URL
export const EventsService = {

    GetEventsViaAxios: async (): Promise<AspenEvent[]> => {
        const res = await axios.get(`${BaseUrl}api/events`);
        return res.data;
      }

};