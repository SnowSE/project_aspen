import { FC, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import useInput from "../../hooks/use-input";
import TextInput from "../../inputs/TextInput";
import Registration from "../../models/registration";
import Team from "../../models/team";
import { createTeam } from "../../store/teamSlice";

type Props = {
    ownerId: number;
}

const TeamForm: FC<Props> = (props): JSX.Element => {
    const [isPublic, setIsPublic] = useState(false);

    const dispatch = useDispatch();
    console.log(props.ownerId)

    const desciption = useInput(
        "Description",
        "Please enter a description",
        (value) => value.trim() !== ""
    );

    const mainImage = useInput(
        "Main Image",
        "Please enter a main image URL?",
        (value) => value.trim() !== ''
    )

    const eventId = useInput(
        "Event Id",
        "Please enter an event ID",
        value => parseInt(value) > 0
    )

    const nickname = useInput(
        "Registration Nickname",
        "Please enter a registration nickname",
        value => value.trim() !== ""
    )

    const name = useInput(
        "Team Name",
        "Please enter a team name",
        value => value.trim() !== ""
    )
    const submitTeamHandler = (event: FormEvent) => {
        event.preventDefault();

        if (desciption.isValid && mainImage.isValid && eventId.isValid) {
            const team = new Team(desciption.value, mainImage.value, props.ownerId, parseInt(eventId.value))
            const registration: Registration = new Registration (
                (new Date()).toUTCString(),
                isPublic,
                nickname.value,
                team.ownerID,
                team.id
            )

            console.log(registration);
            dispatch(createTeam({
                team: team,
                registration: registration
            }));
        }
    };

    return (
        <form onSubmit={submitTeamHandler}>
            <label>Create your team!</label>
            <TextInput inputControl={name}/>
            <TextInput inputControl={desciption} />
            <TextInput inputControl={mainImage} />
            <TextInput inputControl={eventId} />
            <TextInput inputControl={nickname} />

            <label>Is Registration Public: </label>
            <input type='checkbox' checked={isPublic} onChange={() => setIsPublic(state => !state)} />
            <br/>
            <button type="submit">Submit</button>
        </form>
    )
};

export default TeamForm;