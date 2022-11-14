import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Swagger } from "./components/Swagger";
import CreateTeamPage from "./Pages/CreateTeamPage";
import { DonationPage } from "./Pages/DonationPage/DonationPage";
import { TeamsListPage } from "./components/TeamsListPage";
import { Home } from "./Pages/Home/Home";
import LoginLanding from "./Pages/LoginLanding";

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
];

export default AppRoutes;