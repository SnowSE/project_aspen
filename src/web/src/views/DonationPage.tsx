import React from 'react'
import DonationForm from '../components/Donations/DonationForm'
import { useParams } from "react-router";

type DonationParams ={
    eventid?: string
    teamid?: string
}

const DonationPage = () => {
    const {eventid} = useParams<DonationParams>()
    const {teamid} = useParams<DonationParams>()
    return (
        <div>
            <h1 className="text-center">Donations</h1>
            <DonationForm eventid={eventid} teamid={teamid}/>
        </div>
    )
}

export default DonationPage
