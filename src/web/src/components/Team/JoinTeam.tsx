import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import useInput from "../../hooks/use-input";
import TextInput from "../../inputs/TextInput";
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

    const filter = useInput(
        "Filter by name",
        ''
    )
    const filterParameter = filter.value;

    const [filteredTeams, SetFilteredTeams] = useState<Team[]>(teams)
    const [currTeam, setCurrTeam] = useState<Team>();

    useEffect(() => {
        SetFilteredTeams(teams.filter(t => t.name.toLowerCase().includes(filterParameter.toLowerCase())))
    }, [filterParameter, teams])

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
        <div className='row p-2'>
            <div className='col-lg-8'>
                <div className="text-center">
                    <h3>Current Teams</h3>
                </div>
                <div className="d-flex justify-content-center">
                    <TextInput inputControl={filter} />
                </div>
                {filteredTeams.map(t => {
                    return (
                        t.id === currTeam?.id
                            ? <JoinTeamForm team={currTeam} ownerId={selectedPerson!.id} onCancel={cancelJoinHandler} />
                            : <div className="d-flex justify-content-center">
                                <TeamItem key={t.id} ownerId={selectedPerson!.id} team={t} onJoinTeam={joinTeamHandler} />
                            </div>
                    )
                })}
            </div>
            <div className='col-lg-4'>
                <p className="text-center h3">Not finding the right team?</p>
                <p className='mt-2'>Creating a team for your Angel is a great way to involve your family, friends and community in supporting your child. It's an opportunity for the community as a whole to learn more about your child and what makes them so special. In addition to raising awareness and promoting an inclusive environment, teams have the opportunity to win fantastic prizes!</p>
                <p className='fw-bold'>Prizes</p>
                <ul>
                    <li>$500 = win a six pack of movie tickets</li>
                    <li>$1000 = win a Kindle Fire HD 8</li>
                    <li>$2000 = win a Family Membership to Thanksgiving Point</li>
                    <li>$3000 = win an iPad (32 gb)</li>
                </ul>
                <div className='text-center'>
                    <Link className='btn btn-success' to='/teamregistration'>Create New Team</Link>
                </div>
            </div>
        </div>
    )
}

export default JoinTeam;