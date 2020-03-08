import React from "react";
import mockApiResult from "./tempMockResult";
import { Link } from "react-router-dom";
import { Container, Button } from "@material-ui/core";

interface GlobalAdminHomeProps {

};

const GlobalAdminHome:React.FC<GlobalAdminHomeProps> = props => {
    return (
        <Button>
            {mockApiResult.map((organization, key)=> (
                <Link to={`/globalAdministration/${organization.id}`} key={key}>
                    {organization.org}
                </Link>
            ))}
        </Button>
    )
};

export default GlobalAdminHome;