import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Swagger } from "./components/Swagger";
import CreateEventPage from "./Pages/CreateEventPage";
import CreateTeamPage from "./Pages/CreateTeam/CreateTeamPage";
import { DonationPage } from "./Pages/Donation/DonationPage";
import { TeamsListPage } from "./components/TeamsListPage";
import { Home } from "./Pages/Home/Home";
import LoginLanding from "./Pages/Login/LoginLanding";

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
    }
];

export default AppRoutes;