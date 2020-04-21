import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { LOGIN_ROUTE } from "../../constants/RouteConstants";
import { connect } from "react-redux";
import { RETURN_URL } from "../../constants/QueryConstants";
import Token from "../../models/TokenModel";
import { ApplicationState } from "../../store";

interface AuthRouteProps extends RouteProps{
    token: Token | null
    role: string
}

const AuthRoute: React.FC<AuthRouteProps> = (props) => {
  const ready = true;
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

export default connect(mapStateToProps)(AuthRoute);
