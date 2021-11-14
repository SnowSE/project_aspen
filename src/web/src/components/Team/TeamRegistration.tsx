import { FC } from "react";
import Person from "../../models/person";
import TeamForm from "../Forms/TeamForm";
import JoinTeam from "./JoinTeam";

type Props = {
    person: Person;
}

const TeamRegistration: FC<Props> = (props): JSX.Element => {
    return (
        <div>
            <JoinTeam ownerId={props.person.id} />
            <TeamForm ownerId={props.person.id}/>
        </div>
    )
}

export default TeamRegistration;