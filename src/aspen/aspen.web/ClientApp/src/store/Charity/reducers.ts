import { Reducer } from "redux";
import * as ActionTypes from "./actionTypes";
import {initialState} from "../initialState"
import { Charity } from "../../models/CharityModel";
import { Theme } from "../../models/Theme";

//State
export interface CharityState {
  charity: Charity | null,
  theme: Theme
}

//Reducer
export const reducer: Reducer<CharityState> = (state = initialState.charity, action: ActionTypes.CharityActionTypes) => {
  switch (action.type) {
    case ActionTypes.CHARITY_LOAD_SUCCESS:
      return { ...state, charity: action.charity };
    case ActionTypes.THEME_LOAD_SUCCESS:
        return { ...state, theme: action.theme };
    default:
      return state;
  }
};
