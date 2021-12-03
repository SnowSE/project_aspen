import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useStoreSelector } from "../../store";
import { getAllTeams } from "../../store/teamSlice";

const EventTeams: FC = (): JSX.Element => {
    const teamList = useStoreSelector(state => state.team.teamList)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllTeams(1))
    }, [dispatch])

    return (
        <div className='p-2'>
            <h5 className='text-center'>Our Teams</h5>
            {teamList.map(t => <p>{t.name}</p>)}
            <div className="my-3 text-center">
                <NavLink to="/jointeam" className="btn btn-primary me-1">Join Team</NavLink>
            </div>
        </div>
    )
};

export default EventTeams;