import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import EventModel from "../../models/eventModel";
import { useStoreSelector } from "../../store";
import { getTeamsByEvent } from "../../store/teamSlice";
import donationService from "../../services/donationService"
import Team from "../../models/team";

interface Props {
    event: EventModel;
}
type donationsByTeam = {
    team: Team
    donationAmount: number
}
const TopDonors = ({ event }: Props) => {
    const teamList = useStoreSelector(state => state.team.teamList)
    console.log("teamlist", teamList)
    const dispatch = useDispatch();

    const [teamDonations, setTeamDonations] = useState<donationsByTeam[]>([]);



    useEffect(() => {
            dispatch(getTeamsByEvent(event.id))
    }, [dispatch, event.id])

    useEffect(() => {
        const temp: donationsByTeam[] = []
        teamList.forEach(t => donationService.getDonationAmountByTeam(t.id, event.id)
            .then(r => temp.push({team : t , donationAmount : r}))
            .then(r=> setTeamDonations(temp.sort((a,b) => (a.donationAmount < b.donationAmount ? 1: -1))))
        )
        
    }, [teamList, event.id])


    return (
        <div className='p-2'>
            <h5 className='text-center'>Top Donors</h5>
            <hr />
            <div className="text-center">
                {teamDonations.map(t => <p>{t.team.name}</p>)}
            </div>


        </div>
    )
};

export default TopDonors;