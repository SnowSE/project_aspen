import React from "react";
import { ApplicationState } from "../../store";
import { connect } from "react-redux";
import { Theme } from "../../models/Theme";

interface HeaderProps {
    theme: Theme
    greeting: string,
    image: string,
}


const Header: React.FC<HeaderProps> = props => {
    //Styles Fixup
      let header = {
        height: 600,
        position: 'relative',
        width: "100%",
        backgroundImage: `linear-gradient(rgba(255,255,255,0.25), rgba(255,255,255,0.25)), url("https://images.pexels.com/photos/373912/pexels-photo-373912.jpeg")`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      } as React.CSSProperties;

      let overlay = {
        height: 175,
        backgroundColor: String(props.theme.palette.primary.main),
        position: "absolute",
        bottom: 0,
        width: '100%',
        color: 'white',
        opacity: 0.75
      } as React.CSSProperties;

      let overlayText = {
        position: 'absolute',
        bottom: 100,
        width: '100%',
        color: String(props.theme.palette.primary.contrastText),
        fontSize: 32,
        padding: 10,
        textAlign: 'center'
      } as React.CSSProperties;

  return (
    <React.Fragment>
      <div style={header}>
        <div style={overlay}>
        </div>
        <div style={overlayText}>
            {props.greeting}
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
)(Header);