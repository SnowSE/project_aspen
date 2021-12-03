import TeamDescription from "./TeamDetailElements/TeamDescription";
import TeamGoal from "./TeamDetailElements/TeamGoal";
import TeamMembers from "./TeamDetailElements/TeamMembers";

const TeamDetailPage= () =>{
    
    return(
        <div>
            <p className="row h1 text-center border-bottom border-2 border-dark p-3"><strong>Team Name Place Holder</strong></p>
            <div className="row">
                <div className="col-8">
                    <TeamDescription/>
                </div>
                <div className="col">
                    <TeamGoal/>
                    <TeamMembers/>
                </div>
            </div>
        </div>
    )
}

export default TeamDetailPage;