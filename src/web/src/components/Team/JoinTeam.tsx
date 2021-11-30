import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Team from "../../models/team";
import { useStoreSelector } from "../../store";
import { getAllTeams } from "../../store/teamSlice";
import JoinTeamForm from "./JoinTeamForm";
import TeamItem from "./TeamItem";
//import CreatePersonForm from '../Person/CreatePersonForm'

type Props = {
    ownerId?: number;
    eventId: number;
}

const JoinTeam: FC<Props> = (props): JSX.Element => {
    const teams = useStoreSelector(state => state.team.teamList);
    const selectedPerson = useStoreSelector((state) => state.person.selectedPerson)
    const dispatch = useDispatch();

    const [currTeam, setCurrTeam] = useState<Team>();

    useEffect(() => {
        dispatch(getAllTeams(props.eventId));
    }, [dispatch, props.eventId])

    const joinTeamHandler = (team: Team) => {
        setCurrTeam(team);
    }

    const cancelJoinHandler = () => {
        setCurrTeam(undefined);
    }

    return (
        <div className="justify-content-center">
            <div className="text-center">
                <h3>Current Teams</h3>
                <button className='btn btn-success' type='button'>Create New Team</button>
            </div>
            {currTeam && <JoinTeamForm team={currTeam} ownerId={selectedPerson!.id} onCancel={cancelJoinHandler}/>}
            {teams.map(t => {
                return (
                    <div className="d-flex justify-content-center">
                        <TeamItem key={t.id} ownerId={selectedPerson!.id} team={t} onJoinTeam={joinTeamHandler} />
                    </div>
                )
            })}
        </div>
    )
}

export default JoinTeam;