import axios from "axios";
import EventModel from "../models/event";

const Url = `${process.env.PUBLIC_URL}/api/events`;
//new behavior here
//Create
export const addEvent = async (event: EventModel) => {
  const res = await axios.post(Url, { ...event });
  if (res.status !== 200) {
    throw Error("Api error adding event");
  }
  return res;
};

//Read all
export const getEvents = async () => {
  const res = await axios.get(Url);
  if (res.status !== 200) {
  }
  return res.data;
};

//Read individual
export const getEvent = async (id: number) => {
  const res = await axios.get(Url + "/" + id);
  if (res.status !== 200) {
    throw Error("Api error getting event");
  }
  return res.data;
};
//Update
export const updateEvent = async (event: EventModel) => {
  const res = await axios.put(Url + "/", event);
  if (res.status !== 200) {
    throw Error("Api error updating event");
  }
  return res.data;
};
//Delete
export const deleteEvent = async (id: number) => {
  const res = await axios.delete(Url + "/" + id);
  if (res.status !== 200) {
    throw Error("Api error deleting event");
  }
  return res.data;
};
