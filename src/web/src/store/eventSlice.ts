import { createSlice } from "@reduxjs/toolkit";
import {
  getEvent,
  getEvents,
  addEvent,
  updateEvent,
} from "../services/eventApiService";
import EventModel from "../models/event";
import { StoreDispatch } from ".";
import { alertActions } from "./alertSlice";

interface EventState {
  date: string,
  location: string,
  description: string,
  image: string,
  events: EventModel[],
  currentEventId: number
}

const initialEventState: EventState = {
  date: (new Date()).toString(),
  location: "",
  description: "",
  image: "",
  events: [],
  currentEventId: 0
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
      state.events = action.payload;
    },
    setCurrentEventId(state, action) {
      state.currentEventId = action.payload;
    }
  },
});

export const createNewEvent = (event: EventModel) => {
  return async (dispatch: StoreDispatch) => {
    const response = await addEvent(event);
    if (response.status === 200) {
      dispatch(getEventList());
    }
    else {
      dispatch(alertActions.displayAlert({title: "error", message: `${response.status} error. Please try again`, danger:true}));
    }
  };
};

export const updateExistingEvent = (event: EventModel) => {
  return async (dispatch: StoreDispatch) => {
    await updateEvent(event);
    dispatch(getEventList());
  };
};

export const setCurrentEventId = (eventId: number) => {
  return async (dispatch: StoreDispatch) => {
    dispatch(eventActions.setCurrentEventId(eventId));
  }
}

export const getSingleEvent = (id: number) => {
  return async (dispatch: StoreDispatch) => {
    const response = await getEvent(id);
    dispatch(eventActions.setDate(response.date));
    dispatch(eventActions.setLocation(response.location));
    dispatch(eventActions.setDescription(response.description));
    dispatch(eventActions.setImage(response.date));
  };
};

export const getEventList = () => {
  return async (dispatch: StoreDispatch) => {
    const events = await getEvents();
    dispatch(eventActions.setEvents(events?? []));
  };
};

export default eventSlice;
export const eventActions = eventSlice.actions;
