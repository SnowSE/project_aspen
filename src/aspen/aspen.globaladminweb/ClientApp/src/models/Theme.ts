export class Theme {
    readonly typography: Typography;
    readonly palette: Palette;

    constructor(
        PrimaryMainColor: string,
        PrimaryLightColor: string,
        PrimaryContrastTextColor: string,
        SecondaryMainColor: string,
        fontFamily: string){
            this.typography = {fontFamily: fontFamily}
            this.palette = {
                primary: {
                    main: PrimaryMainColor,
                    light: PrimaryLightColor,
                    contrastText: PrimaryContrastTextColor
                },
                secondary: {
                    main: SecondaryMainColor
                }
            }
        }
    
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