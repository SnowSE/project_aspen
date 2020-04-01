import {Charity} from "../../models/CharityModel"

export const GET_ALL_API_SUCCESS = "GET_ALL_API_SUCCESS";
export const GET_API_SUCCESS = "GET_API_SUCCESS";
export const ADD_API_SUCCESS = "ADD_API_SUCCESS";
export const UPDATE_API_SUCCESS = "UPDATE_API_SUCCESS";
export const DELETE_API_SUCCESS = "DELETE_API_SUCCESS";
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

interface AddSuccessAction {
    type: typeof ADD_API_SUCCESS,
    addedCharity: Charity
}

interface UpdateSuccessAction {
    type: typeof UPDATE_API_SUCCESS,
    updatedCharity: Charity
}

interface DeleteSuccessAction {
    type: typeof DELETE_API_SUCCESS,
    deletedCharity: Charity
}

export type CharityAdminActionTypes = 
    GetAllSuccessAction |
    GetSuccessAction |
    GetCharityAdminFailureAction |
    AddSuccessAction |
    UpdateSuccessAction |
    DeleteSuccessAction;