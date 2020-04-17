import { Reducer } from "redux";
import * as ActionTypes from "./actionTypes";
import Token from "../../models/TokenModel";
import {initialState} from "../initialState"

//State
export interface AuthState {
  token: Token | null;
message: string;
}

//Reducer
export const reducer: Reducer<AuthState> = (state = initialState.auth, action: ActionTypes.AuthActionTypes) => {
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