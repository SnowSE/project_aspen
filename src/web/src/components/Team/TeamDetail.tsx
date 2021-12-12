import { StoreDispatch, useStoreSelector } from "../../store";
import { useDispatch } from "react-redux";
import { FC, useEffect } from "react";
import TeamDescription from "./TeamDetailElements/TeamDescription";
import TeamGoal from "./TeamDetailElements/TeamGoal";
import TeamMembers from "./TeamDetailElements/TeamMembers";
import { useParams } from "react-router";
import { getTeamById } from "../../store/teamSlice";

const TeamDetail: FC = ():JSX.Element => {
    const currentTeam = useStoreSelector(state => state.team.currentTeam);
    const dispatch = useDispatch<StoreDispatch>();
    const { teamid } = useParams<{ teamid: string }>();

    useEffect(() => {
        dispatch(getTeamById(parseInt(teamid)))
    }, [dispatch, teamid])
    return (
        <div>
            <p className="row h1 text-center border-bottom border-2 border-dark p-3"><strong>{currentTeam?.name ?? "The NONAMERS"}</strong></p>
            <div className="row">
                <div className="col-3">
                    <img className="w-100" src={currentTeam?.mainImage} />
                </div>
                <div className="col-6">
                    <TeamDescription team={currentTeam} />
                </div>
                <div className="col-3">
                    <TeamGoal team={currentTeam} />
                </div>
            </div>
        </div>
    )
}

export default TeamDetail;