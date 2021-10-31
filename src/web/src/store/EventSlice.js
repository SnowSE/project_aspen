import { createSlice } from "@reduxjs/toolkit";
import {
  getEvent,
  getEvents,
  addEvent,
  updateEvent,
} from "../services/eventApiService";

const initialEventState = {
  date: "",
  location: "",
  description: "",
  image: "",
  events: [],
};

const eventSlice = createSlice({
  name: "event",
  initialState: initialEventState,
  reducers: {
    setDate(state, action) {
      state.date = action.payload;
    },
    setLocation(state, action) {
      state.location = action.payload;
    },
    setDescription(state, action) {
      state.description = action.payload;
    },
    setImage(state, action) {
      state.image = action.payload;
    },
    setEvents(state, action) {
      console.log(action.payload);
      state.events = action.payload;
    },
  },
});

export const createNewEvent = (event) => {
  return async (dispatch) => {
    const response = await addEvent(event);
    if (response.status === 200) {
      dispatch(getEventList());
    }
  };
};

export const updateExistingEvent = (event) => {
  return async (dispatch) => {
    const response = await updateEvent(event);
    if (response.status == 200) {
      dispatch(getEventList());
    }
  };
};

export const getSingleEvent = (id) => {
  return async (dispatch) => {
    const response = await getEvent(id);
    dispatch(eventActions.setDate(response.date));
    dispatch(eventActions.setLocation(response.location));
    dispatch(eventActions.setDescription(response.description));
    dispatch(eventActions.setImage(response.date));
  };
};

export const getEventList = () => {
  return async (dispatch) => {
    const response = await getEvents();
    dispatch(eventActions.setEvents(response.data));
  };
};

export default eventSlice;
export const eventActions = eventSlice.actions;
