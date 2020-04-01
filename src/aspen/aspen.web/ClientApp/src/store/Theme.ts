import { Action, Reducer } from "redux";

//State
export interface ThemeState {
  typography: Typography;
  palette: Palette;
}

export interface Typography {
  fontFamily: string;
}

export interface Palette {
  primary: Primary;
  secondary: Secondary;
}

export interface Primary {
  main: string;
  light: string;
  contrastText: string;
}

export interface Secondary {
  main: string;
}

//Actions
interface ReceiveThemeAction {
  type: "LOADING_THEME";
  typography: Typography;
  palette: Palette;
}

export const actionCreators = {
  receiveTheme: (typography: Typography, palette: Palette) =>
    ({
      type: "LOADING_THEME"
    } as ReceiveThemeAction)
};


const typ: Typography = { fontFamily: "Arial" };
const prim: Primary = {
  main: "#438f00",
  light: "#67cc0e",
  contrastText: "#FFFFFF"
};
const sec: Secondary = { main: "#608045" };
const pal: Palette = { primary: prim, secondary: sec };

const initialState: ThemeState = {
  typography: typ,
  palette: pal
};

//Known Actions
export type KnownAction = ReceiveThemeAction;
//Reducer
export const reducer: Reducer<ThemeState> = (
  state: ThemeState | undefined,
  incomingAction: Action
): ThemeState => {
  if (state == undefined) {
    return initialState;
  }

  const action = incomingAction as KnownAction;
  switch (action.type) {
    case "LOADING_THEME":
      return {
        typography: action.typography,
        palette: action.palette
      };
    default:
        return state;
  }
};
