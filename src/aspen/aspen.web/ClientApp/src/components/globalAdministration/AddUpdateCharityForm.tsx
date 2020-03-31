import React from 'react';
import { Charity } from '../../models/CharityModel';

interface AddUpdateCharityFormProps {
    Charity?: Charity
}


const AddUpdateCharityForm:React.FC<AddUpdateCharityFormProps> = props => {
    return (
        <form>
            <h3>Charity Name</h3>
            <input type="text"></input>
            <h3>Charity Domain</h3>
            <input type="text"></input>
            <h3>Charity Description</h3>
            <input type="text"></input>
        </form>
    )
}

AddUpdateCharityForm.defaultProps = {
    Charity: new Charity("0","","",""),
}

export default AddUpdateCharityForm;