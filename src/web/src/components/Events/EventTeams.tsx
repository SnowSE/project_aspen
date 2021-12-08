import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import EventModel from "../../models/eventModel";
import { useStoreSelector } from "../../store";
import { getTeamsByEvent } from "../../store/teamSlice";

interface Props {
    event: EventModel;
}
const EventTeams = ({ event }: Props) => {
    const teamList = useStoreSelector(state => state.team.teamList);
    const dispatch = useDispatch();
    const [filterInput, setFilterInput] = useState("")
    
    useEffect(() => {
        
        dispatch(getTeamsByEvent(event.id))
      
    }, [dispatch,  event.id])

    const filteredTeams = teamList.filter(t => t.name.toLowerCase().includes(filterInput.toLowerCase()))
    const filterHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
       setFilterInput(event.target.value)

    }

    return (
        <div className='text-center p-2'>
            <h5 className='text-center'>Registered Teams</h5>
            <label>Filter Teams </label>
            <input id="filter" type="text" onChange={filterHandler} />
            <hr />
            <div>
                {filteredTeams.map(t => <div className="border border-secondary">
                    <NavLink to="/jointeam" className="text-primary"><p>{t.name}</p></NavLink>

                </div>)}
            </div>

            <div className="my-3 text-center">
                <NavLink to="/jointeam" className="btn btn-primary me-1">View Teams</NavLink>
            </div>
        </div>
    )
};

export default EventTeams;