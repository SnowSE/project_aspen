import { Route } from "react-router";

const DonationSubRouter = () => {
  return (
    <>
      {/*render Donation form without pre-filled parameter information */}
      <Route path="/:event"></Route>
      <Route path="/:event/:team"></Route>
    </>
  );
};
export default DonationSubRouter;
