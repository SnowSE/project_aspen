export class Theme {
    readonly palette: any;
    readonly typography: any;

    constructor(
        PrimaryMainColor: string,
        PrimaryLightColor: string,
        PrimaryContrastTextColor: string,
        SecondaryMainColor: string,
        fontFamily: string) {
            this.typography = {
                "fontFamily": fontFamily
            }
            this.palette = {
                "primary": {
                    "main": PrimaryMainColor,
                    "light": PrimaryLightColor,
                    "contrastText": PrimaryContrastTextColor
                },
                "secondary": {
                    "main": SecondaryMainColor
                }
            }
    }
}