import React from "react";
import { RouteComponentProps } from "react-router";
import result from "./tempMockResult";
import { Button, makeStyles, createStyles } from "@material-ui/core";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';

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

    const deleteOrg = () => {
        confirmAlert({
            title: 'Confirm to Delete',
            message: 'Are you sure you want to delete this organization? (This cannot be undone)',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {   
                    //delete organization with id          
                    props.history.goBack();
                  }
              },
              {
                label: 'No',
                onClick: () => {}
              },
            ]
          })
    }

    if (typeof organization === 'undefined'){
        return (<div>Not Found</div>)
    }
    return (
        <>
            <h1>
                {organization.org} Settings
            </h1>
            <Button className={classes.deleteBtn} onClick={()=>deleteOrg()}>Delete</Button>
        </>
    )
};

export default GlobalAdminDetails;