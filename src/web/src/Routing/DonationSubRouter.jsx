import { Route } from "react-router";
import DonationPage from "../views/DonationPage";

const DonationSubRouter = () => {
  return (
    <>
      <Route path="/donate/:eventid/:teamid" component={DonationPage} exact/>
      <Route path="/donate/:eventid" component={DonationPage} exact/>
      <Route path="/donate" component={DonationPage} exact/>
    </>
  );
};
export default DonationSubRouter;
