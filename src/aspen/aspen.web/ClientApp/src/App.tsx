import React from 'react';
import { Route, Switch } from 'react-router';
import Home from './components/homepage/Home';
import Login from './components/authentication/Login';
import Register from './components/authentication/Register';
import GlobalAdminRouter from "./components/globalAdministration/GlobalAdminRouter";
import NavBar from "./components/NavBar";
import './custom.css'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Theme } from "./models/Theme";
import * as ThemeStore from "./store/Theme";

const App: React.FC = () => (
    <>
        <NavBar/>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/login' component={Login} />
            <Route path='/Register' component={Register} />
            <Route path="/globalAdministration" component={GlobalAdminRouter} />
        </Switch>
    </>
);

export default connect(
    null,
    ThemeStore.actionCreators
)(App);