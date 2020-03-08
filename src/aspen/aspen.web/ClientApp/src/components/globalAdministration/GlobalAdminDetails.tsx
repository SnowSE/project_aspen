import React from "react";
import { RouteComponentProps } from "react-router";

interface MyRouteProps {
    org: string;
}

interface GlobalAdminDetailsProps extends RouteComponentProps<MyRouteProps>{

};

const GlobalAdminDetails:React.FC<GlobalAdminDetailsProps> = props => {
    return (
        <>
        </>
    )
};

export default GlobalAdminDetails;