import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import EventModel from "../../models/eventModel";
import { useStoreSelector } from "../../store";
import { getTeamsByEvent } from "../../store/teamSlice";

interface Props {
    event: EventModel;
  }
const TopDonors = ({ event }: Props) => {
    const teamList = useStoreSelector(state => state.team.teamList)
    const dispatch = useDispatch();
    const [filteredTeams, setFilteredTeams] = useState(teamList)
    useEffect(() => {
        dispatch(getTeamsByEvent(event.id))
    }, [dispatch])

    // const filterHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setFilteredTeams(event.target.value)
    
    // }

    return (
        <div className='p-2'>
            <h5 className='text-center'>Top Donors</h5>
            {filteredTeams.map(t => <p>{t.name}</p>)}
            
        </div>
    )
};

export default TopDonors;