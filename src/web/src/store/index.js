import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from './AuthSlice'
import eventSlice from './EventSlice'

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    event: eventSlice.reducer,
  },
})

