import { StoreDispatch, useStoreSelector } from "../../store";
import { useDispatch } from "react-redux";
import { FC, useEffect } from "react";
import { useParams } from "react-router";
import { getDonationsByTeamId, getTeamById } from "../../store/teamSlice";
import { NavLink } from "react-router-dom";

const TeamDetail: FC = (): JSX.Element => {
  const { teamid: currentTeamId } = useParams<{ teamid: string }>();
  const currentTeam = useStoreSelector((state) => state.team.currentTeam);
  const currentTeamDonations = useStoreSelector(
    (state) => state.team.currentTeamDonations
  );
  const currentEventId = useStoreSelector(
    (state) => state.event.currentEventId
  );
  const dispatch = useDispatch<StoreDispatch>();
  const donateUrl = "/donate/" + currentEventId + "/" + currentTeam?.id;

  useEffect(() => {
    dispatch(getTeamById(parseInt(currentTeamId)));
    dispatch(
      getDonationsByTeamId({
        eventId: currentEventId,
        teamId: parseInt(currentTeamId),
      })
    );
  }, [dispatch, currentEventId, currentTeamId]);
  return (
    <div>
      <p className="row h1 text-center border-bottom border-2 border-dark p-3">
        <strong>{currentTeam?.name ?? "The NONAMERS"}</strong>
      </p>
      <div className="row">
        <div className="col-3">
          <img className="w-100" src={currentTeam?.mainImage} alt="team" />
        </div>
        <div className="col-6">
          <p className="h2 fw-bold">Meet the Team</p>
          <p>{currentTeam?.description ?? "No Description"}</p>
        </div>
        <div className="col-3">
          <p className="h1 text-center fw-bold border-dark border-1 border-bottom">
            Our Goal
          </p>
          <p className="h1 text-center">
            &#36;{currentTeam?.donationTarget ?? "00.00"}
          </p>
          <p className="h1 text-center fw-bold border-dark border-1 border-bottom mt-4">
            Raised so far
          </p>
          <p className="h1 text-center">
            &#36;{currentTeamDonations ?? "00.00"}
          </p>
          <p className="h1 text-center fw-bold border-dark border-1 border-bottom">
            Donate
          </p>
          <p className="h5 text-center">Donate to our team</p>
          <div className="d-flex justify-content-center">
            <NavLink to={donateUrl} className="btn btn-primary me-1">
              Donate
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamDetail;
