import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import pageDataService from "../services/pageDataService";
import { PageData } from "../models/pageData";

interface PageDataState {
  currentKey?: string
  currentData?: string
  keys: string[]
}
const initialState: PageDataState = {
  currentKey: undefined,
  currentData: undefined,
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
  async (key: string, thunkAPI) => {
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
  async (data: PageData, thunkAPI) => {
    await pageDataService.postPageData(data);
    return await pageDataService.getPageDataKeys();
  }
);

export const putPageData = createAsyncThunk(
  "putPageData",
  async (pageData: PageData, thunkAPI) => {
    await pageDataService.putPageData(pageData);
    // return await pageDataService.getPageDataKeys();
  }
);

export const deletePageData = createAsyncThunk(
  "deletePageData",
  async (key: string, thunkAPI) => {
    await pageDataService.deletePageData(key);
    return await pageDataService.getPageDataKeys();
  }
);

export const setCurrentKey = createAsyncThunk(
  'setCurrentKey',
  async (key: string, thunkAPI) => {
    return await pageDataService.getPageDataByKey(key);
  }
)

const pageDataSlice = createSlice({
  name: "pageData",
  initialState,
  reducers: {
    setPageData(state, action) {
      // state.pdList = action.payload;
    },
    // setCurrentKey(state, action) {
    //   state.currentKey = action.payload;
    // },
    clearCurrentKey(state, action) {
      state.currentKey = undefined;
      state.currentData = undefined;
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
      .addCase(putPageData.fulfilled, (state, action) => {})
      .addCase(deletePageData.fulfilled, (state, action) => {
        state.keys = action.payload;
      })
      .addCase(setCurrentKey.fulfilled, (state, action) => {
        state.currentKey = action.payload.key;
        state.currentData = JSON.stringify(action.payload.data);
      })
  },
});

export const { clearCurrentKey } = pageDataSlice.actions;
export default pageDataSlice;
