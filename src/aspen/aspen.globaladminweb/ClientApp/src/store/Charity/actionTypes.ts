import { Charity } from "../../models/CharityModel";
import { Theme } from "../../models/Theme";

export const CHARITY_LOAD_SUCCESS = "CHARITY_LOAD_SUCCESS";
export const API_FAILURE = "API_FAILURE";
export const THEME_LOAD_SUCCESS = "THEME_LOAD_SUCCESS";

interface CharityLoadSuccess {
    type: typeof CHARITY_LOAD_SUCCESS,
    charity: Charity
}

interface ThemeLoadSuccess {
    type: typeof THEME_LOAD_SUCCESS,
    theme: Theme
}

interface ApiFailureAction {
    type: typeof API_FAILURE,
};

export type CharityActionTypes = 
    CharityLoadSuccess |
    ThemeLoadSuccess |
    ApiFailureAction