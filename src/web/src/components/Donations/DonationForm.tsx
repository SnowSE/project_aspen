import useInput from "../../hooks/use-input";
import NumberInput from "../../inputs/NumberInput";
import Donation from "../../models/donation";
import donationService from "../../services/donationService";
import React, { FormEvent } from "react";
import { getAllTeams } from "../../store/teamSlice";
import { useStoreSelector } from "../../store";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";



const DonationForm = () => {
    const teamList = useStoreSelector(state => state.team.teamList)
    const dispatch = useDispatch();
    const [teamSelect, setTeamSelect] = useState(0)

    useEffect(() => {
        dispatch(getAllTeams(1))
    }, [dispatch])

    
    const selectedEvent = useInput(
        "Event ID",
        "Please enter a event ID",
        value => value.trim() !== ""
    );
    
    const amount = useInput(
        "Donation Amount",
        "Please enter Donation Amount",
        value => value.trim() !== ""
    );

    const teamChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(event.target.value)
        setTeamSelect(Number(event.target.value))
    }

    const submitDonationHandler = async (event: FormEvent) =>{
        event.preventDefault();
        
        if (Number(amount.value) > 0){
           const newDonation = new Donation((new Date()).toISOString(), Number(amount.value), Number(selectedEvent.value), teamSelect )
           const res= await donationService.createDonation(newDonation)
           console.log(res)
        }
        
        
    }
    
    return (
        <div>
            <form onSubmit={submitDonationHandler}>
                <NumberInput inputControl={selectedEvent}/>
                <NumberInput inputControl={amount}/>
                <select className='custom-select' id="inputGroupSelect01" value={teamSelect} onChange={teamChangeHandler}>
                    <option selected>Choose a team...</option>
                    {teamList.map(t => <option value={t.id}>{t.name}</option>)}
                </select><br/>
                <button type='submit' className="btn btn-primary">Submit Payment</button>
            </form>
        </div>
    )
}

export default DonationForm
