import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from './AuthSlice'
import eventSlice from './EventSlice'
import pageDataSlice from "./pageDataSlice";
import personSlice from './PersonSlice';

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    event: eventSlice.reducer,
    pageData: pageDataSlice.reducer,
    person: personSlice.reducer,
  },
})

