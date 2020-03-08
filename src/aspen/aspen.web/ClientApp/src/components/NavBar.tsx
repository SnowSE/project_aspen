import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { NavLink } from "reactstrap";
import { positions } from '@material-ui/system';
import { Link } from "react-router-dom";
import theme from "../theme";
const useStyles = makeStyles({
  navbar: {
    display: "inline-flex",
    width: "100%",
    padding: 10,
    backgroundColor: theme.palette.primary.main,
  },
  logo: {
    backgroundImage: `url("http://www.unitedangels.org/wp-content/themes/parallelus-razor/assets/images/header-logo.png")`,
    height: 50,
    backgroundPosition: "left",
    backgroundRepeat: "no-repeat",
    display: "inline-block",
    width: "50%",

  },
  links: {
    width: "50%",
    display: "inline-block",
    height: 50,
    float: 'right',
  },
  link: {
    color: "white",
    display: 'inline-block',
    float: 'right',
    fontSize: 20,
    fontFamily: theme.typography.fontFamily,
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.primary.light,
    }
  },
});

interface NavbarProps {
}

const Navbar:React.FC<NavbarProps> = props => {
  const classes = useStyles();

  return (
    <React.Fragment>
        <div className={classes.navbar}>
          <div className={classes.logo}></div>
          <div className={classes.links}>
              <NavLink tag={Link} className={classes.link} to="/login">
                Login
              </NavLink>
              <NavLink tag={Link} className={classes.link} to="/register">
                Register
              </NavLink>
              <NavLink tag={Link} className={classes.link} to="/">
                Home
              </NavLink>
          </div>
        </div>
    </React.Fragment>
  );
};

export default Navbar;
