import React, {useState} from "react";
import mockApiResult from "./tempMockResult";
import { Link } from "react-router-dom";
import { Container, Button, createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(()=>
    createStyles({
        CharityDefault: {
            padding: "1vh",
            textAlign: "center",
        },
        CharityOdd: {
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
        <Container>
            <h2>Charity List</h2>
            {mockApiResult.map((Charity, key)=> (
                <Link to={`/globalAdministration/${Charity.ID}`} key={key}>
                    <p className={keyIsEven(key)? classes.CharityDefault: classes.CharityDefault +" "+ classes.CharityOdd}>
                        {Charity.Domain}
                    </p>
                </Link>
            ))}
        </Container>
    )
};

export default GlobalAdminHome;