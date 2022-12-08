import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Swagger } from "./components/Swagger";
import CreateEventPage from "./Pages/Event/CreateEventPage";
import CreateTeamPage from "./Pages/CreateTeam/CreateTeamPage";
import { DonationPage } from "./Pages/Donation/DonationPage";
import { TeamsListPage } from "./components/TeamsInfo/TeamsListPage";
import { Home } from "./Pages/Home/Home";
import LoginLanding from "./Pages/Login/LoginLanding";
import { TeamDetails } from "./components/TeamsInfo/TeamDetails";
import { LoggedInUser } from "./components/TeamsInfo/LoggedInUser";
import LoginButton from "./components/LoginButton";
import SiteAdmin from "./Pages/SiteAdmin/SiteAdmin";

const AppRoutes = [
    {
        index: true,
        path: '/',
        element: <Home />
    },
    {
        path: `/counter`,
        element: <Counter />
    },
    {
        path: `/swagger`,
        element: <Swagger />
    },
    {
        path: `/fetch-data`,
        element: <FetchData />
    },
    {
        path: `/donate`,
        element: <DonationPage />
    },
    {
        path: `/landing`,
        element: <LoginLanding />
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
        path:'/createEvent', 
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
];

export default AppRoutes;