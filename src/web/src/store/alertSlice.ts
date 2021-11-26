import { createSlice } from "@reduxjs/toolkit";

interface AlertState {
    shouldDisplay: boolean;
    message: string;
    danger: boolean;
}

const initialAlertState: AlertState = {
    shouldDisplay: false,
    message: "",
    danger: false,
};

const alertSlice = createSlice({
    name: "event",
    initialState: initialAlertState,
    reducers: {
        displayAlert(state, action) {
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
