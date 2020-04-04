import * as ActionTypes from "./actionTypes";
import { AppThunkAction } from "../index";
import { DomainService } from "../../services/DomainService";
import {LoggerService} from "../../services/LoggerService";
//import {IAuthService} from "../../services/IAuthService";
//import {AuthService} from "../../services/AuthService";

//const authService: IAuthService = new AuthService(new DomainService(),new LoggerService());

function loginSuccess(token: string): ActionTypes.AuthActionTypes{
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        token: token
    };
};

function loginInvalid(message: string): ActionTypes.AuthActionTypes{
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

export function logout(): ActionTypes.AuthActionTypes{
    return {
        type: ActionTypes.LOGOUT_ACTION
    }
}

export function login(username: string, password: string): AppThunkAction<ActionTypes.AuthActionTypes> {
    return function(dispatch) {
        // return authService
        //     .Login(username, password)
        //     .then(result => 
        //         result.status = "" ? 
        //         dispatch(loginSuccess(result.token)) : 
        //         dispatch(loginInvalid(result.message)))
        //     .catch(e=>dispatch(failedApiCall()));
    };
};

export const actionCreators = {
    login,
    logout
}