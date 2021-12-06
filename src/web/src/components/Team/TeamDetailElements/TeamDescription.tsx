import { FC } from "react";
import Team from "../../../models/team";

type Props = {
    team?: Team;
}

const TeamDescription: FC<Props> = (props): JSX.Element => {
    return(
        <div>
            <div className="row">
                <p className="h2"><strong>Meet the Team</strong></p>
            </div>
            <div className="row">
                <p>{props.team?.description ?? "No Description"}</p>
            </div>
        </div>
    )
}

export default TeamDescription;