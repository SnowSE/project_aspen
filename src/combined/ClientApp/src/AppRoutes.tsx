import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
//import { Home } from "./components/Home";

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
];
export default AppRoutes;