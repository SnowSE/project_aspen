import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { NavLink } from "reactstrap";
import { positions } from '@material-ui/system';
import { Link } from "react-router-dom";
import theme from "../../theme";
const useStyles = makeStyles({
  header: {
    height: 600,
    position: 'relative',
    width: "100%",
    backgroundImage: `linear-gradient(rgba(255,255,255,0.25), rgba(255,255,255,0.25)), url("https://images.pexels.com/photos/373912/pexels-photo-373912.jpeg")`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
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
  overlay:{
    height: 175,
    backgroundColor: theme.palette.secondary.main,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    color: 'white',
    opacity: 0.75
  },
  overlayText:{
    position: 'absolute',
    bottom: 100,
    width: '100%',
    color: 'white',
    fontSize: 32,
    padding: 10,
    textAlign: 'center'
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

interface HeaderProps {
    greeting: string,
    backgroundImage: string
}

const Header:React.FC<HeaderProps> = props => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.header}>
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
        <div className={classes.overlay}>
        </div>
        <div className={classes.overlayText}>
            {props.greeting}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Header;
