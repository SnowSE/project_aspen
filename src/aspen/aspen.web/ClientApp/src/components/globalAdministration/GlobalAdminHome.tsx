import React from "react";
import mockApiResult from "./tempMockResult";
import { Link } from "react-router-dom";
import { Container, Button, createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(()=>
    createStyles({
        organizationItem: {
            padding: "1vh",
            textAlign: "center",
        },
        oddItem: {
            background: "gainsboro",
        },
    })
)

interface GlobalAdminHomeProps {

};

const GlobalAdminHome:React.FC<GlobalAdminHomeProps> = props => {
    const classes = useStyles();

    const keyIsEven = (key: number) => {
        return ((key % 2) === 0)
    };
    return (
        <>
            <Container>
                <h2>Organization List</h2>
            </Container>
            {mockApiResult.map((organization, key)=> (
                <Link to={`/globalAdministration/${organization.id}`} key={key}>
                    <Container className={keyIsEven(key)? classes.organizationItem: classes.organizationItem +" "+ classes.oddItem}>
                        {organization.org}
                    </Container>
                </Link>
            ))}
        </>
    )
};

export default GlobalAdminHome;