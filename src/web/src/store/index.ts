import { configureStore } from "@reduxjs/toolkit";
import alertSlice from "./alertSlice";
import AuthReducer from "./authSlice";
import eventSlice from "./eventSlice";
import pageDataSlice from "./pageDataSlice";
import personSlice from "./personSlice";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import teamSlice from "./teamSlice";

export const store = configureStore({
  reducer: {
    alert:alertSlice.reducer,
    auth: AuthReducer,
    event: eventSlice.reducer,
    pageData: pageDataSlice.reducer,
    person: personSlice.reducer,
    team: teamSlice.reducer
  },
});

export type StoreState = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;
export const useStoreSelector: TypedUseSelectorHook<StoreState> = useSelector;
