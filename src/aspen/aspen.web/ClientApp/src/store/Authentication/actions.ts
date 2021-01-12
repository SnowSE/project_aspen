import * as ActionTypes from "./actionTypes";
import { AppThunkAction } from "../index";
import { DomainService } from "../../services/DomainService";
import { LoggerService } from "../../services/LoggerService";
import IAPIAuthorizationService from "../../services/IAPIAuthorizationService";
import APIAuthorizationService from "../../services/APIAuthorizationService";
import Token from "../../models/TokenModel";

const authService: IAPIAuthorizationService = new APIAuthorizationService(new LoggerService());

function loginSuccess(token: Token): ActionTypes.AuthActionTypes {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        token: token
    };
};

function loginInvalid(message: string): ActionTypes.AuthActionTypes {
    return {
        type: ActionTypes.LOGIN_INVALID_CREDENTIALS,
        message: message
    };
};

function failedApiCall(): ActionTypes.AuthActionTypes {
    return {
        type: ActionTypes.API_FAILURE,
    };
};

export function logout(): ActionTypes.AuthActionTypes {
    return {
        type: ActionTypes.LOGOUT_ACTION
    }
}

export function login(username: string, password: string, charityId:string): AppThunkAction<ActionTypes.AuthActionTypes> {
    return function (dispatch) {
        return authService
            .Login(username, password, charityId)
            .then(result => 
                result ?
                dispatch(loginSuccess(result)) : 
                dispatch(loginInvalid("Invalid login")))
            .catch(e=>dispatch(failedApiCall()));
    };
};

export const actionCreators = {
    login,
    logout
}