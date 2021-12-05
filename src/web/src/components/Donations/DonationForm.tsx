import useInput from "../../hooks/use-input";
import NumberInput from "../../inputs/NumberInput";
import Donation from "../../models/donation";
import donationService from "../../services/donationService";
import React, { FormEvent } from "react";
import { getAllTeams } from "../../store/teamSlice";
import { getEventList } from "../../store/eventSlice";
import { useStoreSelector } from "../../store";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

interface Props{
    eventid?: string
    teamid?: string
}


const DonationForm = ({eventid, teamid}: Props) => {
    const teamList = useStoreSelector(state => state.team.teamList)
    const eventList = useStoreSelector(state => state.event.events)
    const dispatch = useDispatch();
    const [teamSelect, setTeamSelect] = useState(0)
    const [eventSelect, setEventSelect] = useState(0)

    useEffect(() => {
        dispatch(getAllTeams(Number(eventid) || 1))
        dispatch(getEventList())
    },[dispatch, eventid])
    
    const amount = useInput(
        "Donation Amount",
        "Please enter Donation Amount",
        value => value.trim() !== ""
    );

    const teamChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(event.target.value)
        setTeamSelect(Number(event.target.value))
    }

    const eventChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setEventSelect(Number(event.target.value))
    }

    const submitDonationHandler = async (event: FormEvent) =>{
        event.preventDefault();
        
        if (amount.isValid){
           const newDonation = new Donation((new Date()).toISOString(), Number(amount.value), eventSelect, teamSelect, 0)
           const res= await donationService.createDonation(newDonation)
           console.log(res)
        }
        
        
    }


    return (
        <div>
            <form onSubmit={submitDonationHandler}>
            { eventList.length > 0 && 
            <div className='form-group'>
            <label htmlFor= "inputGroupSelect02">Which Event?</label>
            <select className='btn btn-dark dropdown-toggle form-control' id="inputGroupSelect02" value={eventSelect} onChange={eventChangeHandler}>
                    {typeof(eventid) == 'undefined' ? 
                        <><option selected>General Donation</option>
                        {eventList.map(t => <option value={t.id}>{t.title}</option>)}
                        </>:
                        <option value={eventid}>{eventList[Number(eventid) - 1 ].title}</option>
                    }
                </select></div>}

                <NumberInput inputControl={amount}/>

                { teamList.length > 0 && 
                <div className='form-group'>
                    <label htmlFor="inputGroupSelect01">Team</label>
                <select className='btn btn-dark dropdown-toggle form-control' id="inputGroupSelect01" value={teamSelect} onChange={teamChangeHandler}>
                    {typeof(teamid) == 'undefined' ? 
                        <><option selected>Choose a team...</option>
                        {teamList.map(t => <option value={t.id}>{t.name}</option>)}
                        </>:
                        <option value={teamid}>{teamList[Number(teamid) - 1].name}</option>
                    }
                </select></div>}
                <br/>
                <button type='submit' className="btn btn-primary">Submit Payment</button>
            </form>
        </div>
    )
}

export default DonationForm
