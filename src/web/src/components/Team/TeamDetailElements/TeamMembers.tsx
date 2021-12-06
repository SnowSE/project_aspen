import { FC } from "react";
import Team from "../../../models/team";

type Props = {
    team?: Team;
}

const TeamMembers: FC<Props>= (props): JSX.Element =>{
    /*TODO There is no way to get a registration by teamid, which is necessary to display the team details.*/
    return(
        <div>
            <h2>Sorry We are having a problem check back soon.</h2>
            {
                //listOfUsers.map((user)=>{
                 //   return <p>{user.name}</p>
                //})
            }
        </div>
    )
}

export default TeamMembers;