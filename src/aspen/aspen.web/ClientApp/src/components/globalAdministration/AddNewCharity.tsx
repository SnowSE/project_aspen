import React from "react";
import AddUpdateCharityForm from "./AddUpdateCharityForm";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../store/GlobalAdmin/actions";
import { ApplicationState } from "../../store";

interface AddNewCharityProps {
    adminAddCharity: typeof actionCreators.adminAddCharity
}

const AddNewCharity:React.FC<AddNewCharityProps> = props => {
    return (
        <>
            <h1>Add New Charity</h1>
            <AddUpdateCharityForm/>
            <Button onClick={()=>props.adminAddCharity()}>Submit</Button>
        </>
    )
}

const mapStateToProps = (state: ApplicationState) => {
    return {
    }
}

export default connect(
  mapStateToProps,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(AddNewCharity);