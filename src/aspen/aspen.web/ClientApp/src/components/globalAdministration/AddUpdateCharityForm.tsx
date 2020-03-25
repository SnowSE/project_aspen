import React from 'react';
import { Charity } from '../../models/CharityModel';

interface AddUpdateCharityFormProps {
    Charity?: Charity
}


const AddUpdateCharityForm:React.FC<AddUpdateCharityFormProps> = props => {
    return (
        <form>
            <input type="text"></input>
            <input type="text"></input>
            <input type="text"></input>
        </form>
    )
}

AddUpdateCharityForm.defaultProps = {
    Charity: new Charity(0,"","",""),
}

export default AddUpdateCharityForm;