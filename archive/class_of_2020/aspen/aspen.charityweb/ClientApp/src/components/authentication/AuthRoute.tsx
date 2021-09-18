import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { LOGIN_ROUTE } from "../../constants/RouteConstants";
import { connect } from "react-redux";
import { RETURN_URL } from "../../constants/QueryConstants";
import Token from "../../models/TokenModel";
import { ApplicationState } from "../../store";

interface AuthRouteProps extends RouteProps{
    token: Token | null
    /**Used to check if a user has a specific role */
    role?: string
}

const AuthRoute: React.FC<AuthRouteProps> = (props) => {
  const ready = true; //TODO use to ensure that the token has loaded
  const authenticated = props.token != null; //TODO check if token is expired //TODO check if token has proper role

  const redirectUrl = `${LOGIN_ROUTE}?${RETURN_URL}=${encodeURI(
    window.location.pathname
  )}`;
  if (!ready) {
    return <></>;
  } else {
    const { token, role, ...rest } = props;
    if(!authenticated) {
        return <Redirect to={redirectUrl} />;
    }
    else{
        return <Route {...rest}/>
    }
  }
};

const mapStateToProps = (state: ApplicationState) => {
  return {
    token: state.auth.token,
  };
};

/**
 * An Authorization Wrapper for Route. Can be used the same as Route from "React Router" with the addition of a 'role' prop
 *
 * @author [Brandon Isbell](https://www.linkedin.com/in/brandonisbell/)
 */
export default connect(mapStateToProps)(AuthRoute);
