import * as Admin from './GlobalAdmin/reducers'
import * as Auth from './Authentication/reducers'
import * as Charity from "./Charity/reducers";

// The top-level state object
export interface ApplicationState {
    admin: Admin.AdminState;
    auth: Auth.AuthState;
    charity: Charity.CharityState;
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    admin: Admin.reducer,
    auth: Auth.reducer,
    charity: Charity.reducer,
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
