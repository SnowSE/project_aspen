import { Action, Reducer } from "redux";
import { initialState } from "./initialState";
//State
export interface CharityState {
  description: string;
}

//Actions
interface ReceiveCharityAction {
  type: "LOADING_CHARITY";
  description: string;
}

export const actionCreators = {
  receiveCharity: (state: CharityState) =>
    ({
      type: "LOADING_CHARITY"
    } as ReceiveCharityAction)
};
const initialCharityState: CharityState = {
  description: "Insert charity description"
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
        description: action.description
      };
    default:
      return state;
  }
};

