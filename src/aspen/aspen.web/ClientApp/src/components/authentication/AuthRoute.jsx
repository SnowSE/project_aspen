import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { LOGIN_ROUTE } from "../../RouteConstants";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../store/Authentication/actions";
import { ApplicationState } from "../../store";

const AuthRoute = (props) => {
  const ready = true;
  const authenticated = false;

  const redirectUrl = `${LOGIN_ROUTE}?returnUrl=${encodeURI(
    window.location.href
  )}`;
  if (!ready) {
    return <></>;
  } else {
    const { component: Component, ...rest } = props;
    return (
      <Route
        {...rest}
        render={(props) => {
          if (authenticated) {
            return <Component {...props} />;
          } else {
            return <Redirect to={redirectUrl} />;
          }
        }}
      />
    );
  }
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps, (dispatch) =>
  bindActionCreators(actionCreators, dispatch)
)(AuthRoute);
