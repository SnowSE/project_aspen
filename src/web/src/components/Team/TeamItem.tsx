import { FC, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import useInput from "../../hooks/use-input";
import TextInput from "../../inputs/TextInput";
import Registration from "../../models/registration";
import Team from "../../models/team";
import { createRegistration } from "../../store/teamSlice";

type Props = {
    team: Team;
    ownerId: number;
}

const TeamItem: FC<Props> = (props): JSX.Element => {
    const [isPublic, setIsPublic] = useState(false);
    const dispatch = useDispatch();

    const nickname = useInput(
        "Registration Nickname",
        "Please enter a registration nickname",
        value => value.trim() !== ""
    )

    const submitRegistrationHandler = (event: FormEvent) => {
        event.preventDefault();
        if (nickname.isValid) {
            const registration = new Registration(
                (new Date()).toUTCString(),
                isPublic,
                nickname.value,
                props.ownerId,
                props.team.id,
            )

            dispatch(createRegistration(registration));
        }
    }
    
    return (
        <div className="border w-50 border-2 m-2 p-2 ">
            
            <p className="d-flex justify-content-center fs-4 bold">
                {props.team.name}
            </p>
            <div className="d-flex justify-content-center" >
                <form onSubmit={submitRegistrationHandler}>
                    <TextInput inputControl={nickname} />
                    <div className="form-check my-2">
                        <input className="form-check-input" type='checkbox' checked={isPublic} onChange={() => setIsPublic(state => !state)} />
                        <label className="form-check-label">Is Registration Public</label>
                    </div>
                    <button className="btn btn-outline-primary" type='submit'>Join Team!</button>
                </form>
            </div>
        </div>
    )
}

export default TeamItem;