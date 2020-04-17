import { CharityState } from "./Charity";
import { Typography, Primary, Secondary, Palette, ThemeState } from "./Theme";
import { AuthState } from "./Authentication/reducers";
import Token from "../models/TokenModel"
import { ApplicationState } from ".";
import { AdminState } from "./GlobalAdmin/reducers";

const initialCharityState: CharityState = {
    charity: null
};

const typ: Typography = { fontFamily: "Arial" };
const prim: Primary = {
    main: "#ffffff",
    light: "#ffffff",
    contrastText: "#FFFFFF"
};
const sec: Secondary = { main: "#ffffff" };
const pal: Palette = { primary: prim, secondary: sec };

export const initialThemeState: ThemeState = {
    typography: typ,
    palette: pal
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
    theme: initialThemeState,
    admin: initialAdminState,
    auth: initialAuthState,
    charity: initialCharityState,
}