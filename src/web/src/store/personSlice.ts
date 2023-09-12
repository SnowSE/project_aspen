import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Person from "../models/person";
import personService from "../services/personService";

export const getAllPersons = createAsyncThunk(
  "person/getAllPersons",
  async (_arg, ThunkAPI) => {
    const personList = await personService.getAllPersons();
    return personList;
  }
);
export const getPersonByAuthId = createAsyncThunk(
  "person/getPersonByAuthId",
  async (authId: string, ThunkAPI) => {
    const person = await personService.getPersonByAuthId(authId);
    return person;
  }
);
export const createPerson = createAsyncThunk(
  "person/createPerson",
  async (person: Person, _ThunkAPI) => {
    await personService.createPerson(person);
  }
);
export const updatePerson = createAsyncThunk(
  "person/updatePerson",
  async (person: Person, _ThunkAPI) => {
    await personService.updatePerson(person);
  }
);
export const deletePerson = createAsyncThunk(
  "person/deletePerson",
  async (personId: number, _ThunkAPI) => {
    await personService.deletePerson(personId);
  }
);

interface PersonState {
  selectedPerson?: Person,
  personList: Person[],
}
const initialPersonState: PersonState = {
  selectedPerson: undefined,
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

    });
    builder.addCase(createPerson.rejected, (state, action) => {
    });
    builder.addCase(getPersonByAuthId.fulfilled, (state, action) => {
      state.selectedPerson= action.payload
    });
    builder.addCase(getPersonByAuthId.rejected, (state, action) => {
    });
    builder.addCase(getAllPersons.fulfilled, (state, action) => {
      state.personList = action.payload;
    });
    builder.addCase(getAllPersons.rejected, (state, action) => {
    });
    builder.addCase(updatePerson.fulfilled, (state, action) => {
    });
    builder.addCase(updatePerson.rejected, (state, action) => {
    });
    builder.addCase(deletePerson.fulfilled, (state, action) => {
    });
    builder.addCase(deletePerson.rejected, (state, action) => {
    });
  },
});

export default personSlice;
export const personActions = personSlice.actions;
