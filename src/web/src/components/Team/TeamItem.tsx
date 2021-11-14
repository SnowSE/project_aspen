import { FC } from "react";
import Team from "../../models/team";

type Props = {
    team: Team;
}

const TeamItem: FC<Props> = (props): JSX.Element => {
    return (
        <div className="border w-50 border-2 m-2 p-2 ">
            
            <p className="d-flex justify-content-center">
                Team description: {props.team.description}
            </p>
            <div className="d-flex justify-content-center" >
                <button className="btn btn-outline-primary" type='button'>Join Team!</button>
            </div>
        </div>
    )
}

export default TeamItem;