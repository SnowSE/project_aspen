import { Swagger } from "./components/Swagger";
import CreateEventPage from "./Pages/Event/CreateEventPage";
import CreateTeamPage from "./Pages/CreateTeam/CreateTeamPage";
import DonationPage  from "./Pages/Donation/DonationPage";
import { TeamsListPage } from "./components/TeamsInfo/TeamsListPage";
import { Home } from "./Pages/Home/Home";
import LoginLanding from "./Pages/Login/LoginLanding";
import { TeamDetails } from "./components/TeamsInfo/TeamDetails";
import { LoggedInUser } from "./components/TeamsInfo/LoggedInUser";
import LoginButton from "./components/LoginButton";
import SiteAdmin from "./Pages/SiteAdmin/SiteAdmin";
import SuccessfulDonation from "./Pages/Donation/SuccessfulDonation";
import FailedPaymentPage from "./Pages/Donation/FailedPaymentPage";
import LinkRedirect from "./components/LinkRedirect/LinkRedirect";
import EditTeam from "./Pages/EditTeam/EditTeam";
import  DeleteTeam  from "./components/TeamsInfo/DeleteTeam";

const AppRoutes = [
    {
        index: true,
        path: '/',
        element: <Home />
    },
    {
        path: `/swagger`,
        element: <Swagger />
    },
    {
        path: `/donate`,
        element: <DonationPage />
    },
    {
        path: `/landing`,
        element: <LoginLanding/>
    },
    {
        path: `/createteam`,
        element: <CreateTeamPage />
    },
     {
         path: `/TeamsListPage`,
         element: <TeamsListPage />
    },
    {
        path:`/createEvent`, 
        element: <CreateEventPage/>
    },

     {
        path: `/TeamDetails`,
        element: <TeamDetails />
    },

    {
        path: `/LoggedInUser`,
        element: <LoggedInUser />
    },   
    {
        path: `/LoginButton`,
        element: <LoginButton />
    },
    {
        path: `/AdminDashboard`,
        element: <SiteAdmin />
    },
    {
        path: `/successfuldonation/:personName/:teamName/:transactionId/:amount/:email/:dateTime`, 
        element:<SuccessfulDonation/>
    },
    {
        path: `/successfuldonation/:personName/:teamName/:transactionId/:amount/:email/:dateTime/:phoneNumber`, 
        element:<SuccessfulDonation/>
    },
    {
        path: `/failedpayment`,
        element: <FailedPaymentPage />
    },
    {
        path: `/links/:linkGUID`,
        element: <LinkRedirect />
    },
    {
        path: `/Donate/links/:linkGUID`,
        element: <LinkRedirect />
    },
    {
        path: `/EditTeam`,
        element: <EditTeam />
    },
    {
        path: `/DeleteTeam`,
        element: <DeleteTeam />
    }
];

export default AppRoutes;