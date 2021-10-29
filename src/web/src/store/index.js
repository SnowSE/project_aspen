import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./AuthSlice";
import pageDataSlice from "./pageDataSlice";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    pageData: pageDataSlice.reducer,
  },
});
