import axios from "axios";
import EventModel from "../models/event";

const Url = "/api/events";

//Create
export const addEvent = async (event: EventModel) => {
  const res = await axios.post(Url, { ...event });
  if (res.status !== 200) {
    console.log(res);
    throw Error("Api error adding event");
  }
  console.log(res)
  return res;
};
//Read all
export const getEvents = async () => {
  console.log("called")
  const res = await axios.get(Url);
  if (res.status !== 200) {
    console.log(res);
    throw Error("Api error getting all events");
  }
  return res.data;
};

//Read individual
export const getEvent = async (id: number) => {
  const res = await axios.get(Url + "/" + id);
  if (res.status !== 200) {
    console.log(res);
    throw Error("Api error getting event");
  }
  return res.data;
};
//Update
export const updateEvent = async (event: EventModel) => {
  const res = await axios.put(Url + "/" + event.ID, { ...event });
  if (res.status !== 200) {
    console.log(res);
    throw Error("Api error updating event");
  }
  return res.data;
};
//Delete
export const deleteEvent = async (id: number) => {
  const res = await axios.delete(Url + "/" + id);
  if (res.status !== 200) {
    console.log(res);
    throw Error("Api error deleting event");
  }
  return res.data;
};
