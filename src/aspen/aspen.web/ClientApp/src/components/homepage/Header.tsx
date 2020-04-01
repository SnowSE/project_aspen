import React, { FunctionComponent, Props } from "react";
import * as ThemeStore from "../../store/Theme";
import { ApplicationState } from "../../store";
import { connect } from "react-redux";

interface HeaderInterface {
    greeting: string,
    image: string,
}

type HeaderProps = ThemeStore.ThemeState & typeof ThemeStore.actionCreators & HeaderInterface;

const Header: FunctionComponent<HeaderProps> = props => {
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
        backgroundColor: String(props.palette.primary.main),
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
        color: String(props.palette.primary.contrastText),
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

export default connect(
  (state: ApplicationState) => state.theme,
  ThemeStore.actionCreators
)(Header);