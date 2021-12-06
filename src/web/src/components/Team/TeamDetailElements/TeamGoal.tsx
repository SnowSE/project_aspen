import { FC } from "react";
import Team from "../../../models/team";

type Props = {
    team?: Team;
}

const TeamGoal: FC<Props> = (props): JSX.Element => {
    return(
        <div>
            <p className="h1 text-center"><u><strong>Goal</strong></u></p>
            <p className="h2 text-center"><strong>&#36;{props.team?.donationTarget ?? "00.00"}</strong></p>
        </div>
    );
}

export default TeamGoal;