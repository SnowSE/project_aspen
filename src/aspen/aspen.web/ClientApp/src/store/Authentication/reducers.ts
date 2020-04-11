import { Reducer } from "redux";
import * as ActionTypes from "./actionTypes";
import Token from "../../models/TokenModel";

//State
export interface AuthState {
  token: Token | null;
message: string;
}

const initialState: AuthState = {
  token: null,
  message: "",
};

//Reducer
export const reducer: Reducer<AuthState> = (state = initialState, action: ActionTypes.AuthActionTypes) => {
  switch (action.type) {
    case ActionTypes.LOGIN_SUCCESS:
      return { ...state, token: action.token };
    case ActionTypes.LOGIN_INVALID_CREDENTIALS:
      return { ...state, token: null, message: action.message };
    case ActionTypes.LOGOUT_ACTION:
      return { ...state, token: null }
    default:
      return state;
  }
};