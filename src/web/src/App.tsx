import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Home } from "./views/Home";
import { LoginLanding } from "./views/auth/LoginLanding";
import { LogoutLanding } from "./views/auth/LogoutLanding";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkIfLoggedIn } from "./store/authSlice";
import PageDataPage from "./views/PageDataPage";
import Admin from "./views/Admin";
import { useStoreSelector } from "./store";
import Unauthorized from "./views/auth/Unauthorized";
import AdminNavBar from "./components/UI/AdminNavBar";

function App() {
  const dispatch = useDispatch();
  const isAdmin = useStoreSelector((state) => state.auth.isAdmin);
  useEffect(() => {
    dispatch(checkIfLoggedIn());
  }, [dispatch]);

  return (
    <Router>
      <NavBar />
      {isAdmin ? <AdminNavBar /> : <></>}
      <Switch>
        <Route path="/login/landing">
          <LoginLanding />
        </Route>
        <Route path="/login/silent">
          <LoginLanding />
        </Route>
        <Route path="/logout/post">
          <LogoutLanding />
        </Route>
        <Route path="/pagedata">
          <PageDataPage />
        </Route>
        <Route path="/admin">{isAdmin ? <Admin /> : <Unauthorized />}</Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

// useEffect(() => {
//   const events = getEvents();
//   console.log(events);
// }, []);

// const apiClickHandler = () => {
//   const events = getEvents();
//   console.log(events);
// };
