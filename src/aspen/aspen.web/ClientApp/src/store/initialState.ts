import { AuthState } from "./Authentication/reducers";
import Token from "../models/TokenModel"
import { ApplicationState } from ".";
import { AdminState } from "./GlobalAdmin/reducers";
import { Theme } from "../models/Theme";
import {CharityState} from "./Charity/reducers"

const initialCharityState: CharityState = {
    charity: null,
    theme: new Theme("#ffffff","#ffffff","#FFFFFF","#ffffff","Arial")
};

let key = localStorage.getItem('KEY')
const initialAuthState: AuthState = {
    token: key != null ? new Token(key) : null,
    message: "",
};

const initialAdminState: AdminState = {
    charityList: [],
    selectedCharity: null
  };

export const initialState: ApplicationState = {
    admin: initialAdminState,
    auth: initialAuthState,
    charity: initialCharityState,
}