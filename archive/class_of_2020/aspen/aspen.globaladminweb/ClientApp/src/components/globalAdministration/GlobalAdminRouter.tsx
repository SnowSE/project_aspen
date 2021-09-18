import React from "react";
import { Route, Switch } from "react-router";
import GlobalAdminHome from "./GlobalAdminHome";
import GlobalAdminDetails from "./GlobalAdminDetails";
import AddNewCharity from "./AddNewCharity";

const GlobalAdminRouter: React.FC = () => {
    return (
        <Switch>
            <Route exact path="/globalAdministration" component={GlobalAdminHome}/>
            <Route path="/globalAdministration/details/:id" component={GlobalAdminDetails}/>
            <Route path="/globalAdministration/new" component={AddNewCharity}/>
        </Switch>
    )
};

export default GlobalAdminRouter;