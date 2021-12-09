import { FC, FormEvent, useState } from "react";
import { StoreDispatch } from "../../store";
import useInput from "../../hooks/use-input";
import TextInput from "../../inputs/TextInput";
import Registration from "../../models/registration";
import Team from "../../models/team";
import { createRegistration } from "../../store/teamSlice";
import { useDispatch } from "react-redux";
import { alertActions } from "../../store/alertSlice";
import { useHistory } from "react-router";

type Props = {
    team: Team;
    ownerId: number;
    onCancel: () => void;
}

const JoinTeamForm: FC<Props> = (props): JSX.Element => {
    const [isPublic, setIsPublic] = useState(false);
    const dispatch = useDispatch<StoreDispatch>();
    const history = useHistory();

    const nickname = useInput(
        "Registration Nickname",
        "Please enter a registration nickname",
        value => value.trim() !== ""
    )

    const submitRegistrationHandler = (event: FormEvent) => {
        event.preventDefault();
        if (nickname.isValid) {
            const registration = new Registration(
                (new Date()).toISOString(),
                isPublic,
                nickname.value,
                props.ownerId,
                props.team.id,
            )

            dispatch(createRegistration(registration))
                .then(r => {
                    if (r.meta.requestStatus === 'fulfilled') {
                        dispatch(alertActions.displayAlert({ title: 'Registration Succcessful', message: 'Your registration has been processed' }));
                        history.push(`/team/${props.team.id}`);
                    }
                    else {
                        dispatch(alertActions.displayAlert({ title: 'Registration Failed', message: `Your registration has been rejected.`, danger: true }));
                    }
                })
        }
    }

    return (
        <div className='d-flex justify-content-center'>
            <div className='border w-50 border-2 m-2 p-2'>
                <h5 className='text-center'>{props.team.name}</h5>
                <form onSubmit={submitRegistrationHandler}>
                    <TextInput inputControl={nickname} />
                    <div className="form-check my-2">
                        <input className="form-check-input" type='checkbox' checked={isPublic} onChange={() => setIsPublic(state => !state)} />
                        <label className="form-check-label">Is Registration Public</label>
                    </div>
                    <button className="btn btn-outline-primary me-2" type='submit'>Join Team!</button>
                    <button className='btn btn-outline-danger mx-2' type='button' onClick={() => props.onCancel()}>Cancel</button>
                </form>
            </div>
        </div>
    )
}

export default JoinTeamForm;