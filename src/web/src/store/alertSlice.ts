import { createSlice } from "@reduxjs/toolkit";

interface AlertState {
    shouldDisplay: boolean;
    title: string;
    message: string;
    danger: boolean;
}

const initialAlertState: AlertState = {
    shouldDisplay: false,
    title: "",
    message: "",
    danger: false,
};

const alertSlice = createSlice({
    name: "alert",
    initialState: initialAlertState,
    reducers: {
        displayAlert(state, action) {
            state.title = action.payload.title;
            state.message = action.payload.message;
            state.danger = action.payload.danger;
            state.shouldDisplay = true;
        },
        hideAlert(state) {
            state.shouldDisplay = false;
        }
    },
});

export const alertActions = alertSlice.actions;
export default alertSlice;