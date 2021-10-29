import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from './AuthSlice'
import EventSliceReducer from './EventSlice'

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    event: EventSliceReducer,
  },
})

