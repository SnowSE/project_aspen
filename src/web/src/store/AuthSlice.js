import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthService } from "../services/authService";

export const checkIfLoggedIn = createAsyncThunk(
  "auth/checkIfLoggedIn",
  async (_, thunkAPI) => {
    // console.log(await AuthService.getUser());
    const user = await AuthService.getUser();
    return user ? JSON.parse(JSON.stringify(user)) : null;
  }
);

const checkIfAdmin = (user) => {
  console.log(user)
  return user.profile.roles.includes("admin-aspen")
}
const initialState = {
  isLoggedIn: false,
  isAdmin: false,
  user: null,
};

const AuthSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isAdmin = checkIfAdmin(action.payload);
    },
    clearUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.isAdmin = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkIfLoggedIn.fulfilled, (state, action) => {
      if (action.payload) {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isAdmin = checkIfAdmin(action.payload)
      } else {
        state.user = null;
        state.isLoggedIn = false;
        state.isAdmin = false;
      }
    });
    builder.addCase(checkIfLoggedIn.rejected, (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.isAdmin = false;
    });
  },
});

export const { setUser, clearUser } = AuthSlice.actions;
export default AuthSlice.reducer;
