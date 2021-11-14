import { FC } from "react";
import Person from "../../models/person";
import { useStoreSelector } from "../../store";
import TeamForm from "../Forms/TeamForm";

type Props = {
    person: Person;
}

const TeamRegistration: FC<Props> = (props): JSX.Element => {
    return (
        <div>
            <TeamForm ownerId={props.person.ID}/>
        </div>
    )
}

export default TeamRegistration;