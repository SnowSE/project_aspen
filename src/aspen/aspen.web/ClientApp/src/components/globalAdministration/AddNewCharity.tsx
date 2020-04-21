import React from "react";
import AddCharityForm from "./AddCharityForm";
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
            <AddCharityForm />
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