import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
//import { Home } from "./components/Home";
import { LoginPage } from "./components/LoginPage";


const root = process.env.PUBLIC_URL
if(!root){ 
    throw "PUBLIC_URL is undefined";
}

const AppRoutes = [
  /*{
    index: true,
    path: root,
    element: <Home />
  },*/
  {
    path: `${root}/counter`,
    element: <Counter />
  },
  {
    path: `${root}/fetch-data`,
    element: <FetchData />
    },
    {
        path: `${root}/loginPage`,
        element: <LoginPage />
    }
];
export default AppRoutes;