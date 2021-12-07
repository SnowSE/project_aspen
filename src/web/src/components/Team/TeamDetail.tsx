import { useStoreSelector } from "../../store";
//import { useDispatch } from "react-redux";
//import { useEffect } from "react";
import TeamDescription from "./TeamDetailElements/TeamDescription";
import TeamGoal from "./TeamDetailElements/TeamGoal";
import TeamMembers from "./TeamDetailElements/TeamMembers";
//import { getTeamsByEvent } from "../../store/teamSlice";
//import { useParams } from "react-router-dom";
import { FC } from "react";

const TeamDetail: FC = (): JSX.Element =>{
    // const {teamid} = useParams();
    const team = useStoreSelector(state => state.team.currentTeam);
    // const teamID: number = parseInt(teamid ?? '-1');
    // const dispatch = useDispatch();
    // useEffect(() => {
    //   dispatch(getTeamsByEvent(teamID));
    // }, [dispatch,teamID]);

    
    return(
        <div>
            <p className="row h1 text-center border-bottom border-2 border-dark p-3"><strong>{team?.name ?? "The NONAMERS"}</strong></p>
            <div className="row">
                <div className="col-8">
                    <TeamDescription team={team}/>
                </div>
                <div className="col">
                    <TeamGoal team={team}/>
                    <TeamMembers team={team}/>
                </div>
            </div>
        </div>
    )
}

export default TeamDetail;