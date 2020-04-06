import { Reducer } from "redux";
import * as ActionTypes from "./actionTypes";

//State
export interface AuthState {
  token: string;
  message: string;
}

const initialState: AuthState = {
  token: "",
  message: "",
};

//Reducer
export const reducer: Reducer<AuthState> = (state = initialState, action: ActionTypes.AuthActionTypes ) => {
  switch (action.type) {
    case ActionTypes.LOGIN_SUCCESS:
        return {...state, token: action.token};
    case ActionTypes.LOGIN_INVALID_CREDENTIALS:
        return {...state, token: "", message: action.message};
    case ActionTypes.LOGOUT_ACTION:
        return {...state, token: ""}
    default:
        return state;
  }
};