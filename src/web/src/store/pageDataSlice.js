import { createSlice } from "@reduxjs/toolkit";
import pageDataService from "../services/pageDataService";

const initialState = {
  currentKey: "",
  currentData: {},
  keys: [],
};

const pageDataSlice = createSlice({
  name: "pageData",
  initialState,
  reducers: {
    setPageData(state, action) {
      state.pdList = action.payload;
    },
    setCurrentKey(state, action) {
      state.current = action.payload;
    },
    setKeys(state, action) {
      state.current = action.payload;
    },
  },
});

// export const getAllPageData = () => {
//   return async (dispatch) => {
//     const data = await pageDataService.getAllPageData();
//     dispatch(pageDataActions.setPageDataDict(data));
//   };
// };
// export const getPageDataByKey = (key) => {
//   return async (dispatch) => {
//     const data = await pageDataService.getPageDataByKey(key);
//   };
// };

// export const postPageData = (data) => {
//   return async (dispatch) => {
//     const successful = await pageDataService.postPageData(data);
//   };
// };

// export const putPageData = (data) => {
//   return async (dispatch) => {
//     const successful = await pageDataService.putPageData(data);
//   };
// };

// export const deletPageData = (key) => {
//   return async (dispatch) => {
//     const successful = await pageDataService.deletePageData(key);
//   };
// };

export const pageDataActions = pageDataSlice.actions;
export default pageDataSlice;
