import { FC, FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useInput from "../../hooks/use-input";
import TextInput from "../../inputs/TextInput";
import EventModel from "../../models/eventModel";
import Registration from "../../models/registration";
import Team from "../../models/team";
import { createTeam } from "../../store/teamSlice";
import { useStoreSelector } from "../../store";
import { getEventList } from "../../store/eventSlice";
import {useHistory} from 'react-router-dom'
import {isWebUri} from 'valid-url'

type Props = {
  ownerId: number;
};

const verifyImageUrl = (url: string)=>{
    if(isWebUri(url))
      return true
    else
      return false
}

const TeamForm: FC<Props> = (props): JSX.Element => {
  const [isPublic, setIsPublic] = useState(true);
  const [currentEvent, setCurrentEvent] = useState<EventModel>(
    new EventModel()
  );
  const events = useStoreSelector((state) => state.event.events);
  const history = useHistory()
  const dispatch = useDispatch();

  const description = useInput(
    "Description",
    "Please enter a description",
    (value) => value.trim() !== ""
  );

  const nickname = useInput(
    "Your Nickname",
    "Please enter a nickname",
    (value) => value.trim() !== ""
  );

  const imageURL = useInput("Image URL", "Please Provide a Valid URL", (value) => verifyImageUrl(value));
  const name = useInput(
    "Team Name",
    "Please enter a team name",
    (value) => value.trim() !== ""
  );

  useEffect(() => {
    const today = new Date();
    const dummyEvent = new EventModel(
      new Date(),
      "",
      "There are currently no upcoming events.",
      ""
    );
    if (events.length !== 0) {
      const closestEvent = events.reduce((a, b) => {
        const diff = new Date(a.date).getTime() - today.getTime();
        return diff > 0 && diff < new Date(b.date).getTime() - today.getTime()
          ? a
          : b;
      });
      setCurrentEvent(closestEvent);
    } else {
      setCurrentEvent(dummyEvent);
    }
  }, [events]);

  useEffect(() => {
    dispatch(getEventList());
  }, [dispatch]);

  const submitTeamHandler = (event: FormEvent) => {
    event.preventDefault();
    if(imageURL.value === '')
    {
      imageURL.isValid = true
      imageURL.value = "Image URL Here"
    }


    if (description.isValid && name.isValid && imageURL.isValid) {
      const team = new Team(
        name.value,
        description.value,
        imageURL.value,
        props.ownerId,
        currentEvent.id
      );
      const registration: Registration = new Registration(
        new Date().toUTCString(),
        isPublic,
        nickname.value,
        team.ownerID,
        team.id
      );

      dispatch(
        createTeam({
          team: team,
          registration: registration,
        })
      );
      history.replace('/jointeam')
    }
  };

  return (
    <div className="container w-50 border p-5 my-3">
      <form onSubmit={submitTeamHandler}>
        <label className="form-label fs-5">Create your team!</label>
        <TextInput inputControl={name} />
        <TextInput inputControl={description} />
        <TextInput inputControl={imageURL} />

        <div className="form-check my-2 form-switch">
          <label className="form-check-label">
            Make My Registration Public
            <input
              className="form-check-input"
              type="checkbox"
              checked={isPublic}
              onChange={() => setIsPublic((state) => !state)}
            />
          </label>
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Submit
        </button>
      </form>
    </div>
  );
};

export default TeamForm;
