import { Route } from "react-router";

export const DonationSubRouter = () => {
  return (
    <>
      {/*render Donation form without pre-filled parameter information */}
      <Route path="/:event"></Route>
      <Route path="/:event/:team"></Route>
    </>
  );
};
