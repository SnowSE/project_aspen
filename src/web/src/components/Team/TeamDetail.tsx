import { useStoreSelector } from "../../store";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import TeamDescription from "./TeamDetailElements/TeamDescription";
import TeamGoal from "./TeamDetailElements/TeamGoal";
import TeamMembers from "./TeamDetailElements/TeamMembers";
import { useParams } from "react-router";
import { getAllTeams } from "../../store/teamSlice";

const TeamDetail = () => {
    const { teamid } = useParams<{ teamid?: string }>();
    const [currentTeam] = useState<any>({})
    const currentEventId = useStoreSelector(state => state.event.currentEventId);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(teamid)
        dispatch(getAllTeams(currentEventId))
    }, [dispatch, currentEventId,teamid])
    return (
        <div>
            <p className="row h1 text-center border-bottom border-2 border-dark p-3"><strong>{currentTeam?.name ?? "The NONAMERS"}</strong></p>
            <div className="row">
                <p>loaded</p>
                <div className="col-8">
                    <TeamDescription team={currentTeam} />
                </div>
                <div className="col">
                    <TeamGoal team={currentTeam} />
                    <TeamMembers team={currentTeam} />
                </div>
            </div>
        </div>
    )
}

export default TeamDetail;