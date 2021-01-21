import Token from "../../models/TokenModel";

export const LOGIN_INVALID_CREDENTIALS = "LOGIN_INVALID_CREDENTIALS";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const API_FAILURE = "API_FAILURE";
export const LOGOUT_ACTION = "LOGOUT_ACTION";

interface LoginSuccessAction {
    type: typeof LOGIN_SUCCESS,
    token: Token,
};

interface InvalidCredentialAction {
    type: typeof LOGIN_INVALID_CREDENTIALS,
    message: string
};

interface ApiFailureAction {
    type: typeof API_FAILURE,
};

interface LogoutAction {
    type: typeof LOGOUT_ACTION,
}



export type AuthActionTypes = 
    LoginSuccessAction |
    InvalidCredentialAction |
    ApiFailureAction | 
    LogoutAction;
