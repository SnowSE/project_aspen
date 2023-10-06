import useInput from "../../hooks/use-input";
import NumberInput from "../../inputs/NumberInput";
import Donation from "../../models/donation";
import donationService from "../../services/donationService";
import React, { FormEvent } from "react";
import { getTeamsByEvent } from "../../store/teamSlice";
import { getEventList } from "../../store/eventSlice";
import { useStoreSelector } from "../../store";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getPersonByAuthId } from "../../store/personSlice";
import { alertActions } from "../../store/alertSlice";
import { useHistory } from "react-router";

interface Props {
  eventid?: string;
  teamid?: string;
}

const DonationForm = ({ eventid, teamid }: Props) => {
  const teamList = useStoreSelector((state) => state.team.teamList);
  const eventList = useStoreSelector((state) => state.event.events);
  const curUser = useStoreSelector((state) => state.auth.user);
  const selectedPerson = useStoreSelector(
    (state) => state.person.selectedPerson
  );
  const dispatch = useDispatch();
  const [teamSelect, setTeamSelect] = useState(0);
  const [eventSelect, setEventSelect] = useState(Number(eventid) ?? 0);
  const history = useHistory();

  useEffect(() => {
    dispatch(getTeamsByEvent(Number(eventid) || 1));
    dispatch(getEventList());
    dispatch(getPersonByAuthId(curUser?.profile.email ?? ""));
  }, [dispatch, eventid, curUser]);

  const amount = useInput(
    "Donation Amount",
    "Please enter a valid Donation Amount that is greater than 0",
    (value) => value.trim() !== "" && Number(value.trim()) > 0
  );

  const teamChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTeamSelect(Number(event.target.value));
  };

  const eventChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEventSelect(Number(event.target.value));
  };

  const submitDonationHandler = async (event: FormEvent) => {
    event.preventDefault();

    if (amount.isValid && teamSelect !== 0) {
      const newDonation = new Donation(
        Number(eventid),
        new Date().toISOString(),
        Number(amount.value),
        teamSelect,
        selectedPerson?.id
      );
      console.log(newDonation);
      const res = await donationService.createDonation(newDonation);
      if (res.statusText === "OK") {
        dispatch(
          alertActions.displayAlert({
            title: "Dontation Sent",
            message: "Your donation has been sent and will be processed",
          })
        );
        history.push("/");
      } else {
        dispatch(
          alertActions.displayAlert({
            title: "Donation Failed",
            message:
              "Something went wrong and your donation was not sent properly",
            danger: true,
          })
        );
      }
    } else if (amount.isValid) {
      const newDonation = new Donation(
        Number(eventid),
        new Date().toISOString(),
        Number(amount.value),
        (teamid ? Number(teamid): undefined),
        selectedPerson?.id
      );

      console.log(newDonation);
      const res = await donationService.createDonation(newDonation);
      if (res.statusText === "OK") {
        dispatch(
          alertActions.displayAlert({
            title: "Dontation Sent",
            message: "Your donation has been sent and will be processed",
          })
        );
        history.push("/");
      } else {
        dispatch(
          alertActions.displayAlert({
            title: "Donation Failed",
            message:
              "Something went wrong and your donation was not sent properly",
            danger: true,
          })
        );
      }
    }
  };

  return (
    <div className="container w-100 border p-5 my-3">
      <form onSubmit={submitDonationHandler}>
        {eventList.length > 0 && (
          <div className="form-group my-3">
            <label htmlFor="inputGroupSelect02">Which Event?</label>
            <select
              className="btn btn-light dropdown-toggle form-control"
              id="inputGroupSelect02"
              value={eventSelect}
              onChange={eventChangeHandler}
            >
              {typeof eventid == "undefined" ? (
                <>
                  <option selected>General Donation</option>
                  {eventList.map((t) => (
                    <option value={t.id}>{t.title}</option>
                  ))}
                </>
              ) : (
                <option value={eventid}>
                  {eventList[Number(eventid) - 1].title}
                </option>
              )}
            </select>
          </div>
        )}

        <NumberInput inputControl={amount} />
        {teamList.length > 0 && (
          <div className="form-group">
            <label htmlFor="inputGroupSelect01">Team</label>
            <select
              className="btn btn-light dropdown-toggle form-control"
              id="inputGroupSelect01"
              value={teamSelect}
              onChange={teamChangeHandler}
            >
              {typeof teamid == "undefined" ? (
                <>
                  <option selected>Choose a team...</option>
                  {teamList.map((t) => (
                    <option value={t.id}>{t.name}</option>
                  ))}
                </>
              ) : (
                <option value={teamid}>
                  {teamList.find((t) => t.id === Number(teamid))?.name}
                </option>
              )}
            </select>
          </div>
        )}
        <br />
        <div className="row">
          <button type="submit" className="btn btn-primary col-5 col-sm-4">
            Submit Payment
          </button>
          <div className="col-2 col-sm-4"></div>
          <button
            className="btn btn-danger col-5 col-sm-4"
            onClick={() => history.goBack()}
          >
            Cancel Donation
          </button>
        </div>
      </form>
    </div>
  );
};

export default DonationForm;
