import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import pageDataService from "../services/pageDataService";

const initialState = {
  currentKey: "",
  currentData: {},
  keys: [],
};

export const getAllPageData = createAsyncThunk(
  "getAllPageData",
  async (args, thunkAPI) => {
    return await pageDataService.getAllPageData();
  }
);

export const getPageDataByKey = createAsyncThunk(
  "getPageDataByKey",
  async (key, thunkAPI) => {
    return await pageDataService.getPageDataByKey(key);
  }
);

export const getPageDataKeys = createAsyncThunk(
  "getPageDataKeys",
  async (args, thunkAPI) => {
    return await pageDataService.getPageDataKeys();
  }
);

export const postPageData = createAsyncThunk(
  "postPageData",
  async (data, thunkAPI) => {
    await pageDataService.postPageData(data);
    return await pageDataService.getPageDataKeys();
  }
);

export const putPageData = createAsyncThunk(
  "putPageData",
  async (data, thunkAPI) => {
    await pageDataService.putPageData(data);
    // return await pageDataService.getPageDataKeys();
  }
);

export const deletePageData = createAsyncThunk(
  "deletePageData",
  async (key, thunkAPI) => {
    await pageDataService.deletePageData(key);
    return await pageDataService.getPageDataKeys();
  }
);

const pageDataSlice = createSlice({
  name: "pageData",
  initialState,
  reducers: {
    setPageData(state, action) {
      // state.pdList = action.payload;
    },
    setCurrentKey(state, action) {
      // state.current = action.payload;
    },
    setKeys(state, action) {
      // state.current = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPageData.fulfilled, (state, action) => {})
      .addCase(getPageDataByKey.fulfilled, (state, action) => {
        state.currentData = action.payload;
      })
      .addCase(getPageDataKeys.fulfilled, (state, action) => {
        state.keys = action.payload;
      })
      .addCase(postPageData.fulfilled, (state, action) => {
        state.keys = action.payload;
      })
      .addCase(putPageData.fulfilled, (state, aciton) => {})
      .addCase(deletePageData.fulfilled, (state, action) => {
        state.keys = action.payload;
      });
  },
});

export const pageDataActions = pageDataSlice.actions;
export default pageDataSlice;
