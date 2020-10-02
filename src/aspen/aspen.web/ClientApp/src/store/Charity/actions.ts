import { Charity } from "../../models/CharityModel";
import * as ActionTypes from "./actionTypes"
import { APIService } from "../../services/APIService";
import { DomainService } from "../../services/DomainService";
import { LoggerService } from "../../services/LoggerService";
import { AppThunkAction } from "..";
import { Theme } from "../../models/Theme";

const apiService = new APIService(new DomainService(),new LoggerService())

function loadCharity(charity: Charity): ActionTypes.CharityActionTypes {
    return {
        type: ActionTypes.CHARITY_LOAD_SUCCESS,
        charity: charity
    };
};

function loadTheme(theme: Theme): ActionTypes.CharityActionTypes {
    return {
        type: ActionTypes.THEME_LOAD_SUCCESS,
        theme: theme
    }
}

export function loadCharityAction(): AppThunkAction<ActionTypes.CharityActionTypes> {
    return function(dispatch) {
      return apiService
      .GetCharityHomePage()
      .then(result => {
          dispatch(loadCharity(result.Charity));
          dispatch(loadTheme(result.Theme));
        })
      .catch(e => e);
    };
  };

export const actionCreators = {
    loadCharityAction,
}