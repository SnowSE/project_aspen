import React from "react";
import { RouteComponentProps } from "react-router";
import result from "./tempMockResult";
import { Button, makeStyles, createStyles } from "@material-ui/core";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import AddUpdateCharityForm from "./AddUpdateCharityForm";

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
    const charity = result.find(a=>a.ID.toString() === props.match.params.id);

    const deleteOrg = () => {
        confirmAlert({
            title: 'Confirm to Delete',
            message: 'Are you sure you want to delete this Charity? (This cannot be undone)',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {   
                    //delete Charity with id          
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

    if (typeof charity === 'undefined'){
        return (<div>Not Found</div>)
    }
    return (
        <>
            <h1>
                {charity.Domain} Settings
            </h1>
            <AddUpdateCharityForm Charity={undefined}/>
            <Button className={classes.deleteBtn} onClick={()=>deleteOrg()}>Delete</Button>
        </>
    )
};

export default GlobalAdminDetails;