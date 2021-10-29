import { createSlice} from "@reduxjs/toolkit";
import { getEvent, getEvents } from "../services/eventApiService";

const initialEventState = {
    date: "",
    location: "",
    description: "",
    image: "",
    events:[]
}

const eventSlice = createSlice({
    name: "event",
    initialState: initialEventState,
    reducers: {
        createDate(state, action){
            state.event.date = action.payload;
        },
        updateDate(state, action){
            state.event.date = action.payload;
        },
        createLocation(state, action){
            state.event.location = action.payload;
        },
        updateLocation(state, action){
            state.event.location = action.payload;
        },
        createDescription(state, action){
            state.event.description = action.payload;
        },
        updateDescription(state, action){
            state.event.description = action.payload;
        },
        createImage(state, action){
            state.event.image = action.payload;
        },
        updateImage(state, action){
            state.event.image = action.payload;
        },
        setEvents(state, action){
            state.event.events = action.payload;
        }
    }
})

export const getSingleEvent=(id)=>{
    return async(dispatch) =>{
        const response = await getEvent(id)
        dispatch(eventActions.getSingleEvent(response))
    }
};

export const getEventList=()=>{
    return async(dispatch) => {
        const response = await getEvents()
        dispatch(eventActions.getEventList(response))
    }
}


export default eventSlice;
export const eventActions = eventSlice.actions;