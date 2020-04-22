import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router";
import { Button, makeStyles, createStyles } from "@material-ui/core";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import UpdateCharityForm from "./UpdateCharityForm";
import { ApplicationState } from "../../store";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../store/GlobalAdmin/actions";
import { Charity } from "../../models/CharityModel";

const useStyles = makeStyles(() =>
  createStyles({
    deleteBtn: {
      background: "red"
    }
  })
);

interface MyRouteProps {
  id: string;
}

interface GlobalAdminDetailsProps extends RouteComponentProps<MyRouteProps> {
  adminFetchSpecificCharity: typeof actionCreators.adminFetchSpecificCharity;
  adminDeleteCharity: typeof actionCreators.adminDeleteCharity;
  selectedCharity: Charity | null;
}

const GlobalAdminDetails: React.FC<GlobalAdminDetailsProps> = props => {
  useEffect(() => {
    props.adminFetchSpecificCharity(props.match.params.id);
  },[]);

  const classes = useStyles();

  const deleteOrg = () => {
    confirmAlert({
      title: "Confirm to Delete",
      message:
        "Are you sure you want to delete this Charity? (This cannot be undone)",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            if (props.selectedCharity !== null) {
              props.adminDeleteCharity(props.selectedCharity);
            }
            props.history.goBack();
          }
        },
        {
          label: "No",
          onClick: () => {}
        }
      ]
    });
  };

  if (props.selectedCharity !== null) {
      return (
        <>
            {/* <h1>{props.selectedCharity.Domains[0]} Settings</h1> */}
          <h1>{props.selectedCharity.CharityName}</h1>
            <UpdateCharityForm Charity={undefined} />
            <Button className={classes.deleteBtn} onClick={() => deleteOrg()}>
            Delete
            </Button>
        </>
    );
} else{
    return <div>Not Found</div>;
}
};

const mapStateToProps = (state: ApplicationState) => {
  return {
    selectedCharity: state.admin.selectedCharity
  };
};

export default connect(mapStateToProps, dispatch =>
  bindActionCreators(actionCreators, dispatch)
)(GlobalAdminDetails);
