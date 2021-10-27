import { createSlice } from "@reduxjs/toolkit";
import pageDataService from "../services/pageDataService";

const initialState = {
  current: "",
  pdList: {},
};

const pageDataSlice = createSlice({
  name: "pageData",
  initialState,
  reducers: {
    setPageDataDict(state, action) {
      state.pdList = action.payload;
    },
    setCurrentPageData(state, action) {
      state.current = action.payload;
    },
  },
});

const transformFromAPI = (data) => {
  return data.reduce(
    (previous, current) => ({ ...previous, [current.key]: current.data }),
    {}
  );
};

export const getAllPageData = () => {
  return async (dispatch) => {
    const data = await pageDataService.getAllPageData();
    const dict = transformFromAPI(data);
    dispatch(pageDataActions.setPageDataDict(dict));
  };
};
export const getPageDataByKey = (key) => {
  return async (dispatch) => {
    const data = await pageDataService.getPageDataByKey(key);
  };
};

export const postPageData = (data) => {
  return async (dispatch) => {
    const successful = await pageDataService.postPageData(data);
  };
};

export const putPageData = (data) => {
  return async (dispatch) => {
    const successful = await pageDataService.putPageData(data);
  };
};

export const deletPageData = (key) => {
  return async (dispatch) => {
    const successful = await pageDataService.deletePageData(key);
  };
};

export const pageDataActions = pageDataSlice.actions;
export default pageDataSlice;
