import React from "react";
import { NavLink } from "reactstrap";
import { ApplicationState } from "../store";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as RouteConstants from "../constants/RouteConstants";
import { Theme } from "../models/Theme";

interface NavbarProps {
  theme: Theme
}

const Navbar: React.FC<NavbarProps> = props => {
  const classes = {
    navbar: {
      display: "inline-flex",
      width: "100%",
      padding: 10,
      backgroundColor: props.theme.palette.secondary.main,
    },
    logo: {
      backgroundImage: `url("http://www.unitedangels.org/wp-content/themes/parallelus-razor/assets/images/header-logo.png")`,
      height: 50,
      backgroundPosition: "left",
      backgroundRepeat: "no-repeat",
      display: "inline-block",
      width: "50%"
    },
    links: {
      width: "50%",
      display: "inline-block",
      height: 50,
      float: "right"
    } as React.CSSProperties,
    link: {
      color: "white",
      display: "inline-block",
      float: "right",
      fontSize: 20,
      fontFamily: props.theme.typography.fontFamily,
      textDecoration: "none",
      "&:hover": {
        color: props.theme.palette.primary.light
      } 
    } as React.CSSProperties
  };

  return (
    <React.Fragment>
      <div style={classes.navbar}>
        <div style={classes.logo}></div>
        <div style={classes.links}>
          <NavLink tag={Link} style={classes.link} to={RouteConstants.LOGIN_ROUTE}>
            Login
          </NavLink>
          <NavLink tag={Link} style={classes.link} to={RouteConstants.REGISTER_ROUTE}>
            Register
          </NavLink>
          <NavLink tag={Link} style={classes.link} to={RouteConstants.HOME_ROUTE}>
            Home
          </NavLink>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state: ApplicationState) => {
  return {
      theme: state.charity.theme
  }
}

export default connect(
  mapStateToProps
)(Navbar);
