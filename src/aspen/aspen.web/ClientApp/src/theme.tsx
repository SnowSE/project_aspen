import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

let theme: any = createMuiTheme({
  palette: {
    primary: {
      main: "#438f00",
      light: "#67cc0e",
      contrastText: "#FFFFFF"
    },
    secondary: {
      main: "#608045"
    },
  },
  typography: {
    fontFamily: "Roboto",
    h5: {
      color: "rgba(0,0,0,0.65)",
      fontWeight: 600
    }
  }
});

theme = responsiveFontSizes(theme);
export default theme;
