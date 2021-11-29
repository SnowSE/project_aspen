import { FC } from "react";
import Team from "../../models/team";

type Props = {
    team: Team;
    ownerId: number;
    onJoinTeam: (team: Team) => void;
}

const TeamItem: FC<Props> = (props): JSX.Element => {
    return (
        <div className="border w-50 border-2 m-2 p-2 text-center ">
            <p className="fs-4 bold">
                {props.team.name}
            </p>
            <button className="btn btn-primary" onClick={() => props.onJoinTeam(props.team)}>Join Now!</button>
        </div>
    )
}

export default TeamItem;