import { FC } from "react";
import Team from "../../../models/team";

type Props = {
    team?: Team;
}

const TeamDescription: FC<Props> = (props): JSX.Element => {
    return (
        <div>
            <p className="h2 fw-bold">Meet the Team</p>
            <p>{props.team?.description ?? "No Description"}</p>
        </div>
    )
}

export default TeamDescription;