import { FC } from "react";
import Team from "../../../models/team";

type Props = {
    team?: Team;
}

const TeamGoal: FC<Props> = (props): JSX.Element => {
    return(
        <div>
            <p className="h1 text-center fw-bold">Our Goal</p>
            <p className="h1 text-center fw-bold">&#36;{props.team?.donationTarget ?? "00.00"}</p>
        </div>
    );
}

export default TeamGoal;