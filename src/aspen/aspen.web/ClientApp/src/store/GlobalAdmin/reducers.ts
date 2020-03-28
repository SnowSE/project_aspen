import { Reducer } from "redux";
import { CharityAdminActionTypes, GET_ALL_API_SUCCESS, GET_API_SUCCESS } from "./actionTypes";
import { Charity } from "../../models/CharityModel";

//State
export interface AdminState {
  charityList: Charity[];
  selectedCharity: Charity | null;
}

const initialState: AdminState = {
  charityList: [],
  selectedCharity: null
};

//Reducer
export const reducer: Reducer<AdminState> = (state = initialState, action: CharityAdminActionTypes ) => {
  switch (action.type) {
    case GET_ALL_API_SUCCESS:
      return {...state, charityList: action.charityList};
    case GET_API_SUCCESS:
      return {...state, selectedCharity: action.selectedCharity};
    default:
        return state;
  }
};
