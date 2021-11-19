import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useStoreSelector } from "../../store";
import { getAllTeams } from "../../store/teamSlice";
import TeamItem from "./TeamItem";
import CreatePersonForm from '../Person/CreatePersonForm'

type Props = {
    ownerId: number;
}

const JoinTeam: FC<Props> = (props): JSX.Element => {
    const teams = useStoreSelector(state => state.team.teamList);
    const dispatch = useDispatch();
    const selectedPerson = useStoreSelector((state) => state.person.selectedPerson)
    const authId = useStoreSelector((state) => state.auth.user?.profile.email) ?? "";

    useEffect(() => {
        dispatch(getAllTeams());
    }, [dispatch])

    return (
        <div className="">
            {teams.map(t => {
                return (
                    <div className = "d-flex justify-content-center">
                        {!selectedPerson ? <CreatePersonForm authId={authId}/> : <TeamItem ownerId={props.ownerId} team={t} />}
                    </div>
                )
            })}
        </div>
    )
}

export default JoinTeam;