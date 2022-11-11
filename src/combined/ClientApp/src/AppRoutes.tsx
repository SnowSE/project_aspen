import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import CreateTeamPage from "./Pages/CreateTeamPage";
import { DonationPage } from "./Pages/DonationPage/DonationPage";
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
];

export default AppRoutes;