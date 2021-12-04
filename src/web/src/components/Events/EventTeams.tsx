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
    const teamList = useStoreSelector(state => state.team.teamList);
    const dispatch = useDispatch();
    const [filteredTeams, setFilteredTeams] = useState(teamList);

    useEffect(() => {
        console.log(event.id)
        if(teamList.length === 0){
            dispatch(getTeamsByEvent(event.id))
        }
        setFilteredTeams(teamList)
    }, [dispatch, teamList, event.id])

    const filterHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newFilter= teamList.filter(obj => obj.name.includes(event.target.value))
        setFilteredTeams(newFilter)
    
    }
    console.log(event)
    return (
        <div className='p-2'>
            <h5 className='text-center'>Registered Teams</h5>
            <label>Filter Teams </label>
            <input id="filter" type="text" onChange={filterHandler}/>
            <hr/>
            <div className="card">
                {filteredTeams.map(t => <p>{t.name}</p>)}
            </div>
            
            <div className="my-3 text-center">
                <NavLink to="/jointeam" className="btn btn-primary me-1">Join Team</NavLink>
            </div>
        </div>
    )
};

export default EventTeams;