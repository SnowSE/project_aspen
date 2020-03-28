import {Charity} from "../../models/CharityModel"

export const GET_ALL_API_SUCCESS = "GET_ALL_API_SUCCESS";
export const GET_API_SUCCESS = "GET_API_SUCCESS";
export const API_FAILURE = "API_FAILURE";

interface GetAllSuccessAction {
    type: typeof GET_ALL_API_SUCCESS,
    charityList: Charity [],
};

interface GetSuccessAction {
    type: typeof GET_API_SUCCESS,
    selectedCharity: Charity,
}

interface GetCharityAdminFailureAction {
    type: typeof API_FAILURE,
};

export type CharityAdminActionTypes = GetAllSuccessAction | GetSuccessAction | GetCharityAdminFailureAction;