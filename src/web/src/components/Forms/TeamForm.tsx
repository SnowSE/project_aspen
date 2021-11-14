import { FC, FormEvent } from "react";
import { useDispatch } from "react-redux";
import useInput from "../../hooks/use-input";
import TextInput from "../../inputs/TextInput";
import Team from "../../models/team";
import { createTeam } from "../../store/teamSlice";

type Props = {
    ownerId: number;
}

const TeamForm: FC<Props> = (props): JSX.Element => {
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

    const submitTeamHandler = (event: FormEvent) => {
        event.preventDefault();

        if (desciption.isValid && mainImage.isValid && eventId.isValid) {
            const team = new Team(desciption.value, mainImage.value, props.ownerId, parseInt(eventId.value))
            console.log(team)
            dispatch(createTeam(team))
        }
    };

    return (
        <form onSubmit={submitTeamHandler}>
            <label>Create your team!</label>
            <TextInput inputControl={desciption} />
            <TextInput inputControl={mainImage} />
            <TextInput inputControl={eventId} />
            <button type="submit">Submit</button>
        </form>
    )
};

export default TeamForm;