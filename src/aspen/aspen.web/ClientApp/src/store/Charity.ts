import { Action, Reducer } from "redux";
import { initialState } from "./initialState";
import { Charity } from "../models/CharityModel";
import { AppThunkAction } from ".";
import { APIService } from "../services/APIService";
import { DomainService } from "../services/DomainService";
import { LoggerService } from "../services/LoggerService";

const apiService = new APIService(new DomainService(),new LoggerService())
//State
export interface CharityState {
  charity: Charity | null
}

//Actions
interface ReceiveCharityAction {
  type: "LOADING_CHARITY";
  charity: Charity;
}

export const loadCharityAction = (): AppThunkAction<KnownAction> => {
  return function(dispatch) {
    return apiService
    .GetCharityHomePage()
    .then(result => dispatch(receiveCharity(result.Charity)))
    .catch(e => e);
  };
};

function receiveCharity(charity: Charity): ReceiveCharityAction{
    return {
      type: "LOADING_CHARITY",
      charity
    }
}

export const actionCreators = {
  loadCharityAction
};
const initialCharityState: CharityState = {
  charity: null
};
export type KnownAction = ReceiveCharityAction;
//Reducer
export const reducer: Reducer<CharityState> = (
  state: CharityState | undefined,
  incomingAction: Action
): CharityState => {
  if (state == undefined) {
    return initialCharityState;
  }

  const action = incomingAction as KnownAction;
  switch (action.type) {
    case "LOADING_CHARITY":
      return {
        charity: action.charity
      };
    default:
      return state;
  }
};

