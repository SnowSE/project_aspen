import { FC, FormEvent } from "react";
import { useDispatch } from "react-redux";
import useInput from "../../hooks/use-input";
import TextInput from "../../inputs/TextInput";
import Team from "../../models/team";

type Props = {
    ownerId: number;
}

const TeamForm: FC<Props> = (props): JSX.Element => {
    const dispatch = useDispatch();

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
            //dispatch an aciton.
        }
    };

    return (
        <form onSubmit={submitTeamHandler}>
            <label>Create your team!</label>
            <TextInput inputControl={desciption} />
            <TextInput inputControl={mainImage} />
            <TextInput inputControl={eventId} />
        </form>
    )
};

export default TeamForm;