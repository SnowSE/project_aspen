import { FC, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import EventModel from "../../models/eventModel";
import { useStoreSelector } from "../../store";
import { getAllTeams, getTeamsByEvent } from "../../store/teamSlice";

interface Props {
    event: EventModel;
  }
const EventTeams = ({ event }: Props) => {
    const teamList = useStoreSelector(state => state.team.teamList)
    const dispatch = useDispatch();
    const [filteredTeams, setFilteredTeams] = useState(teamList)
    useEffect(() => {
        dispatch(getTeamsByEvent(event.ID))
    }, [dispatch])

    // const filterHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setFilteredTeams(event.target.value)
    
    // }

    return (
        <div className='p-2'>
            <h5 className='text-center'>Registered Teams</h5>
            <label>Filter Teams </label>
            {/* <input id="filter" type="text" value={filteredTeams} onChange={filterHandler}/> */}
            {filteredTeams.map(t => <p>{t.name}</p>)}
            <div className="my-3 text-center">
                <NavLink to="/jointeam" className="btn btn-primary me-1">Join Team</NavLink>
            </div>
        </div>
    )
};

export default EventTeams;