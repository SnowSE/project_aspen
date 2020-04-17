import React from 'react';
import { Route, Switch } from 'react-router';
import Home from './components/homepage/Home';
import Login from './components/authentication/Login';
import Register from './components/authentication/Register';
import GlobalAdminRouter from "./components/globalAdministration/GlobalAdminRouter";
import NavBar from "./components/NavBar";
import AuthRoute from "./components/authentication/AuthRoute";
import './custom.css'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Theme } from "./models/Theme";
import * as ThemeStore from "./store/Theme";
import * as CharityStore from "./store/Charity"
import * as RouteConstants from "./RouteConstants";

type AppProps = typeof ThemeStore.actionCreators & typeof CharityStore.actionCreators

const App: React.FC<AppProps> = props => {
    props.loadThemeAction();
    props.loadCharityAction();
    return(

    <>
        <NavBar/>
        <Switch>
            <Route exact path={RouteConstants.HOME_ROUTE} component={Home} />
            <Route path={RouteConstants.LOGIN_ROUTE} component={Login} />
            <Route path={RouteConstants.REGISTER_ROUTE} component={Register} />
            <AuthRoute path={RouteConstants.GLOBAL_ADMIN_ROUTE} component={GlobalAdminRouter} />
        </Switch>
    </>
    )
    };

export default connect(
    null,
    dispatch => bindActionCreators({...ThemeStore.actionCreators, ...CharityStore.actionCreators}, dispatch)
)(App);