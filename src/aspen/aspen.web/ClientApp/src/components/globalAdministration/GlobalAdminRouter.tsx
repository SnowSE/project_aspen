import React from "react";
import { Route, Switch } from "react-router";
import GlobalAdminHome from "./GlobalAdminHome";
import GlobalAdminDetails from "./GlobalAdminDetails"

const GlobalAdminRouter: React.FC = () => {
    return (
        <Switch>
            <Route exact path="/globalAdministration" component={GlobalAdminHome}/>
            <Route path="/globalAdministration/:id" component={GlobalAdminDetails}/>
        </Switch>
    )
};

export default GlobalAdminRouter;