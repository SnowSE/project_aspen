import * as ActionTypes from "./actionTypes";
import { Charity } from "../../models/CharityModel";
import { AppThunkAction } from "../index";
import { IAPIService } from "../../services/IAPIService";
import { APIService } from "../../services/APIService";
import { DummyAPIService } from "../../services/DummyAPIService";
import { DomainService } from "../../services/DomainService";

const apiService: IAPIService = new APIService(new DomainService());
//for testing without the api
//const apiService: IAPIService = new DummyAPIService();

function getAllCharities(charityList: Charity[]): ActionTypes.CharityAdminActionTypes {
  return {
    type: ActionTypes.GET_ALL_API_SUCCESS,
    charityList: charityList,
  };
};

function getCharity(selectedCharity: Charity): ActionTypes.CharityAdminActionTypes {
    return {
        type: ActionTypes.GET_API_SUCCESS,
        selectedCharity: selectedCharity,
    };
};

function deleteCharity(deletedCharity: Charity): ActionTypes.CharityAdminActionTypes{
    return {
        type: ActionTypes.DELETE_API_SUCCESS,
        deletedCharity: deletedCharity
    };
};

export function addCharity(addedCharity: Charity): ActionTypes.CharityAdminActionTypes{
    return {
        type: ActionTypes.ADD_API_SUCCESS,
        addedCharity: addedCharity
    };
};

function updateCharity(updatedCharity: Charity): ActionTypes.CharityAdminActionTypes{
    return {
        type: ActionTypes.UPDATE_API_SUCCESS,
        updatedCharity: updatedCharity
    }
}

function failedApiCall(): ActionTypes.CharityAdminActionTypes {
  return {
    type: ActionTypes.API_FAILURE,
  };
};

export function adminFetchAllCharities(): AppThunkAction<ActionTypes.CharityAdminActionTypes> {
    return function(dispatch) {
      return apiService
        .GetAllCharities()
        .then(result => dispatch(getAllCharities(result)))
        .catch(e=>dispatch(failedApiCall()));
    };
};

export function adminFetchSpecificCharity(id: number): AppThunkAction<ActionTypes.CharityAdminActionTypes> {
    return function(dispatch) {
        return apiService
            .GetCharityByID(id)
            .then(result => dispatch(getCharity(result)))
            .catch(e=>dispatch(failedApiCall()));
    };
};

export function adminAddCharity(charity: Charity): AppThunkAction<ActionTypes.CharityAdminActionTypes> {
    return function(dispatch) {
        return apiService
            .PostCreateCharity()
            .then(result => dispatch(addCharity(charity)))
            .catch(e => dispatch(failedApiCall()))
    }
}

export function adminDeleteCharity(charity: Charity): AppThunkAction<ActionTypes.CharityAdminActionTypes> {
    return function(dispatch) {
        return apiService
            .PostDeleteCharity(charity)
            .then(result => dispatch(deleteCharity(charity)))
            .catch(e => dispatch(failedApiCall()));
    };
};

export const adminUpdateCharity = (charity: Charity): AppThunkAction<ActionTypes.CharityAdminActionTypes> => {
    return function(dispatch) {
        return apiService
            .PostUpdateCharity(charity)
            .then(result => dispatch(updateCharity(charity)))
            .catch(e => dispatch(failedApiCall()));
    };
};

export const actionCreators = {
    adminAddCharity,
    adminDeleteCharity,
    adminUpdateCharity,
    adminFetchAllCharities,
    adminFetchSpecificCharity
}