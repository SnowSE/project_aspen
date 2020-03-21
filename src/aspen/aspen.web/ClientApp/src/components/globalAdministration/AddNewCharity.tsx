import React from "react";
import AddUpdateCharityForm from "./AddUpdateCharityForm";
import { Button } from "@material-ui/core";

interface AddNewCharityProps {

}

const AddNewCharity:React.FC<AddNewCharityProps> = props => {
    return (
        <>
            <h1>Add New Charity</h1>
            <AddUpdateCharityForm/>
            <Button>Submit</Button>
        </>
    )
}

export default AddNewCharity