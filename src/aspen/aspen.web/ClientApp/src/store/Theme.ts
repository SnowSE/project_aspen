import { Action, Reducer } from "redux";
import { Theme } from "../models/Theme";
import { APIService } from "../services/APIService";
import { Typography } from "@material-ui/core";

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
  // typography: Typography;
  // palette: Palette;
  theme: Theme;
}

export const actionCreators = {
  receiveTheme: (theme: Theme) =>
    ({
      type: "LOADING_THEME"
    } as ReceiveThemeAction)
};


const typ: Typography = { fontFamily: "Arial" };
const prim: Primary = {
  main: "#fcb8ab",
  light: "#ffddd6",
  contrastText: "#000000"
};
const sec: Secondary = { main: "#ffe0a6" };
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
        typography: action.theme.typography,
        palette: action.theme.palette
      };
    default:
        return state;
  }
};

// const adaptTheme: ThemeState = (theme: Theme) => {
//   let pal = theme.palette as Palette;
//   let primary = {
//     main: theme.palette.primary.main,
//     light: theme.palette.primary.light,
//     contrastText: theme.palette.primary.contrastText
//   } as Primary;
  
//   let secondary = {
//     main: theme.palette.secondary.main
//   } as Secondary;
  
//   let typ = {
//     fontFamily: theme.typography.fontFamily
//   } as Typography;

//   let newState = {
//     typography: typ,
//     palette: {
//       primary,
//       secondary,
//     } as Palette
//   } as ThemeState;
  
//   return newState;
// }

// export class Theme {
//   readonly palette: any;
//   readonly typography: any;

//   constructor(
//       PrimaryMainColor: string,
//       PrimaryLightColor: string,
//       PrimaryContrastTextColor: string,
//       SecondaryMainColor: string,
//       fontFamily: string) {
//           this.typography = {
//               "fontFamily": fontFamily
//           }
//           this.palette = {
//               "primary": {
//                   "main": PrimaryMainColor,
//                   "light": PrimaryLightColor,
//                   "contrastText": PrimaryContrastTextColor
//               },
//               "secondary": {
//                   "main": SecondaryMainColor
//               }
//           }
//   }
// }