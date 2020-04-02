import React from "react";
import { NavLink } from "reactstrap";
import * as ThemeStore from "../store/Theme";
import { ApplicationState } from "../store";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";

interface NavbarInterface {}

type NavbarProps = ThemeStore.ThemeState & typeof ThemeStore.actionCreators & NavbarInterface;

const Navbar: React.FC<NavbarProps> = props => {
  const classes = {
    navbar: {
      display: "inline-flex",
      width: "100%",
      padding: 10,
      backgroundColor: props.palette.secondary.main,
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
      fontFamily: props.typography.fontFamily,
      textDecoration: "none",
      "&:hover": {
        color: props.palette.primary.light
      } 
    } as React.CSSProperties
  };

  return (
    <React.Fragment>
      <div style={classes.navbar}>
        <div style={classes.logo}></div>
        <div style={classes.links}>
          <NavLink tag={Link} style={classes.link} to="/login">
            Login
          </NavLink>
          <NavLink tag={Link} style={classes.link} to="/register">
            Register
          </NavLink>
          <NavLink tag={Link} style={classes.link} to="/">
            Home
          </NavLink>
        </div>
      </div>
    </React.Fragment>
  );
};

export default connect(
  (state: ApplicationState) => state.theme,
  dispatch => bindActionCreators(ThemeStore.actionCreators, dispatch)
)(Navbar);
