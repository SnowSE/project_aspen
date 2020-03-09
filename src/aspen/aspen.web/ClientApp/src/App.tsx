import React from "react";
import { Route, Switch } from "react-router";
import Home from "./components/homepage/Home";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import GlobalAdminRouter from "./components/globalAdministration/GlobalAdminRouter";
import Layout from "./components/Layout";
import "./custom.css";
import TeamPage from "./components/teams/TeamPage";

export default () => (
  <Layout>
    <Route exact path="/" component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/Register" component={Register} />
    <Route path="/teams" component={TeamPage} />
    <Route path="/globalAdministration" component={GlobalAdminRouter} />
  </Layout>
);
