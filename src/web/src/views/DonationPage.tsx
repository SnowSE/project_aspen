import React from "react";
import DonationForm from "../components/Donations/DonationForm";
import { useParams } from "react-router";

type DonationParams = {
  eventid?: string;
  teamid?: string;
};

const DonationPage = () => {
  const { eventid } = useParams<DonationParams>();
  const { teamid } = useParams<DonationParams>();
  return (
    <div className="container">
      <h1 className="text-center justify-content-center">Donations</h1>
      <div className="container row">
        <div className="col"></div>
        <div className="col-12 col-lg-8 col-md-10 col-sm-12 ">
          <DonationForm eventid={eventid} teamid={teamid} />
        </div>
        <div className="col"></div>
      </div>

      
    </div>
  );
};

export default DonationPage;
