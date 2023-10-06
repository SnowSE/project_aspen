import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import EventModel from "../../models/eventModel";
import Team from "../../models/team";
import { useStoreSelector } from "../../store";
import { getPersonByAuthId } from "../../store/personSlice";
import { getTeamsByEvent } from "../../store/teamSlice";
import JoinTeamForm from "../Team/JoinTeamForm";

interface Props {
    event: EventModel;
}
const EventTeams = ({ event }: Props) => {
    const dispatch = useDispatch();

    const teamList = useStoreSelector(state => state.team.teamList);
    const selectedPerson = useStoreSelector((state) => state.person.selectedPerson)
    const authId =useStoreSelector((state) => state.auth.user?.profile.email) ?? "";
    
    const [selectedTeam, setSelectedTeam] = useState<Team>();
    const [showJoinTeamForm, setShowJoinTeamForm] = useState(false);

    useEffect(() => {
        async function getPerson() { await dispatch(getPersonByAuthId(authId));}
        getPerson();
        dispatch(getTeamsByEvent(event.id))

    }, [dispatch, authId, event.id])
    const cancelJoinHandler = () => {
        setSelectedTeam(undefined);
        setShowJoinTeamForm(false)
    }
    const setDisplayTeamForm = (team: Team) => {
        setSelectedTeam(team);
        setShowJoinTeamForm(true)
    };


    return (
        <div className='text-center p-2'>
            <h5 className='text-center'>Registered Teams</h5>
            <hr />
            {showJoinTeamForm ?
                selectedTeam ?
                    <JoinTeamForm team={selectedTeam} ownerId={selectedPerson!.id} onCancel={cancelJoinHandler} /> : null
                :
                <div>
                    {teamList.slice(0,5).map(t => <div className="">
                        <div className="row border border-success my-1 p-1 align-items-center">
                            <NavLink to={`/team/${t.id}`} className='col p-0'><p className="m-0 text-success text-decoration-none text-primary">{t.name}</p></NavLink>
                            <button className='col btn btn-success m-0' onClick={() => setDisplayTeamForm(t)}>join team.</button>
                        </div>
                    </div>)}
                </div>}
            <div className="my-3 text-center">
                <NavLink to="/jointeam" className="btn btn-primary me-1">View All Teams</NavLink>
            </div>
            <hr/>
        </div>

    )
};

export default EventTeams;