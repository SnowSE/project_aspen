import { createSlice } from "@reduxjs/toolkit";
import personService from "../services/personService";

const initialPersonState = {
    authID: "",
    name: "",
    bio: "",
    people:[]
}

const personSlice= createSlice({
    name: "person",
    initialState: initialPersonState,
    reducers: {
        createAuthID(state, action){
            state.event.authID = action.payload
        },
        updateAuthID(state, action){
            state.event.authID = action.payload
        },
        createName(state, action){
            state.event.authID = action.payload
        },
        updateName(state, action){
            state.event.authID = action.payload
        },
        createBio(state, action){
            state.event.authID = action.payload
        },
        updateBio(state, action){
            state.event.authID = action.payload
        },
        setPeople(state, action){
            state.event.authID = action.payload
        },
    }

})

export const getPeople=()=>{
    return async(dispatch) => {
        const response = await getPeople()
        dispatch(personActions.getPeople(response))
    }
}

export default personSlice
export const personActions = personSlice.actions;