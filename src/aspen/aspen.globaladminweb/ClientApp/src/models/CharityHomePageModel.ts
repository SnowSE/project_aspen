import { Theme } from "./Theme";
import { Charity } from "./CharityModel";

export class CharityHomePage {
    readonly Theme: Theme;
    readonly Charity: Charity;
    constructor(Theme:Theme,Charity:Charity){
        this.Theme = Theme;
        this.Charity = Charity;
    }
}