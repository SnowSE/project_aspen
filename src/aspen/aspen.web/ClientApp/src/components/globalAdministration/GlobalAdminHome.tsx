import React, {useState} from "react";
import mockApiResult from "./tempMockResult";
import AddUpdateCharityForm from "./AddUpdateCharityForm";
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
        AddButton: {
            background: "lightblue"
        }
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
                <Link to={`/globalAdministration/details/${Charity.ID}`} key={key}>
                    <p className={keyIsEven(key)? classes.CharityDefault: classes.CharityDefault +" "+ classes.CharityOdd}>
                        {Charity.Domain}
                    </p>
                </Link>
            ))}
            <Button className={classes.AddButton} href={`/globalAdministration/new`}>Add New</Button>
        </Container>
    )
};

export default GlobalAdminHome;