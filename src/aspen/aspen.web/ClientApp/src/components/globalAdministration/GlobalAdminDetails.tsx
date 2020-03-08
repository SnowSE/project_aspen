import React from "react";
import { RouteComponentProps } from "react-router";
import result from "./tempMockResult";
import { Button, makeStyles, createStyles } from "@material-ui/core";

const useStyles = makeStyles(()=>
    createStyles({
        deleteBtn: {
            background: "red",
        },
    })
)

interface MyRouteProps {
    id: string;
}

interface GlobalAdminDetailsProps extends RouteComponentProps<MyRouteProps>{

};

const GlobalAdminDetails:React.FC<GlobalAdminDetailsProps> = props => {
    const classes = useStyles();
    const organization = result.find(a=>a.id.toString() === props.match.params.id);

    if (typeof organization === 'undefined'){
        return (<div>Not Found</div>)
    }
    return (
        <>
            <h1>
                {organization.org} Settings
            </h1>
            <Button className={classes.deleteBtn}>Delete</Button>
        </>
    )
};

export default GlobalAdminDetails;