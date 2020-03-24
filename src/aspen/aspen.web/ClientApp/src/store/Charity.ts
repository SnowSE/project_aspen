import { Action, Reducer } from "redux";

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

const initialState: CharityState = {
  description: "Insert charity description"
};

export type KnownAction = ReceiveCharityAction;
//Reducer
export const reducer: Reducer<CharityState> = (
  state: CharityState | undefined,
  incomingAction: Action
): CharityState => {
  if (state == undefined) {
    return initialState;
  }

  const action = incomingAction as KnownAction;
  switch (action.type) {
    case "LOADING_CHARITY":
      return {
        description: action. description
      };
    default:
        return state;
  }
};

