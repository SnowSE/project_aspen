import React from "react";
import { Route, Redirect } from "react-router-dom";
import { LOGIN_ROUTE } from "../../constants/RouteConstants";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../store/Authentication/actions";
import { RETURN_URL } from "../../constants/QueryConstants";

//To eventually convert to TSX. Proptypes should extend RouteProps from "react-router-dom"

const AuthRoute = (props) => {
  const ready = true;
  const authenticated = props.token != null;

  const redirectUrl = `${LOGIN_ROUTE}?${RETURN_URL}=${encodeURI(
    window.location.pathname
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
