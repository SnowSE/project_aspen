import React from 'react';
import { Route, Switch } from 'react-router';
import Home from './components/homepage/Home';
import Login from './components/authentication/Login';
import Register from './components/authentication/Register';
import CreateTeam from './components/createTeam/CreateTeam'
import GlobalAdminRouter from "./components/globalAdministration/GlobalAdminRouter";
import NavBar from "./components/NavBar";
import AuthRoute from "./components/authentication/AuthRoute";
import './custom.css';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {actionCreators} from "./store/Charity/actions";
import * as RouteConstants from "./constants/RouteConstants";
import {GLOBAL_ADMIN} from "./constants/RoleConstants";

type AppProps = typeof actionCreators;

const App: React.FC<AppProps> = props => {
    props.loadCharityAction();
    return(
        <>
            <NavBar/>
            <Switch>
                <Route exact path={RouteConstants.HOME_ROUTE} component={Home} />
                <Route path={RouteConstants.LOGIN_ROUTE} component={Login} />
                <Route path={RouteConstants.REGISTER_ROUTE} component={Register} />
                <Route path={RouteConstants.CREATE_TEAM_ROUTE} component={CreateTeam} />
                <AuthRoute role={GLOBAL_ADMIN} path={RouteConstants.GLOBAL_ADMIN_ROUTE} component={GlobalAdminRouter} />
            </Switch>
        </>
    )
    };

export default connect(
    null,
    dispatch => bindActionCreators({...actionCreators}, dispatch)
)(App);