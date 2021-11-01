import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import personService from "../services/personService";

export const getAllPersons = createAsyncThunk(
  "person/getAllPersons",
  async (_arg, ThunkAPI) => {
    const personList = await personService.getAllPersons();
    return personList;
  }
);
export const createPerson = createAsyncThunk(
  "person/createPerson",
  async (Person, ThunkAPI) => {
    await personService.createPerson(Person);
  }
);
export const updatePerson = createAsyncThunk(
  "person/updatePerson",
  async (args, ThunkAPI) => {
    await personService.updatePerson(args.id, args.Person);
  }
);
export const deletePerson = createAsyncThunk(
  "person/deletePerson",
  async (personId, ThunkAPI) => {
    await personService.deletePerson(personId);
  }
);
const initialPersonState = {
  selectedPerson: { AuthId: 0, Name: "", Bio: "" },
  personList: [],
};

const personSlice = createSlice({
  name: "person",
  initialState: initialPersonState,
  reducers: {
    setCurrentPerson(state, action) {
      state.selectedPerson = action.payload.currentPerson;
    },
    setPersonList(state, action) {
      state.personList = action.payload.personList;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createPerson.fulfilled, (state, action) => {
      console.log("success");
    });
    builder.addCase(createPerson.rejected, (state, action) => {
      console.log("error", action.payload);
    });
    builder.addCase(getAllPersons.fulfilled, (state, action) => {
      console.log("success", action.payload);
      state.personList = action.payload;
    });
    builder.addCase(getAllPersons.rejected, (state, action) => {
      console.log("error ", action.payload);
    });
    builder.addCase(updatePerson.fulfilled, (state, action) => {
      console.log("success", action.payload);
    });
    builder.addCase(updatePerson.rejected, (state, action) => {
      console.log("error", action.payload);
    });
    builder.addCase(deletePerson.fulfilled, (state, action) => {
      console.log("success", action.payload);
    });
    builder.addCase(deletePerson.rejected, (state, action) => {
      console.log("error", action.payload);
    });
  },
});

export default personSlice;
export const personActions = personSlice.actions;
