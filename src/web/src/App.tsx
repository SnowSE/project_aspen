import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Home } from "./views/Home";
import { LoginLanding } from "./views/auth/LoginLanding";
import { LogoutLanding } from "./views/auth/LogoutLanding";
import { useDispatch } from "react-redux";
import { FC, useEffect } from "react";
import { checkIfLoggedIn } from "./store/authSlice";
import PageDataPage from "./views/PageDataPage";
import Admin from "./views/Admin";
import CreatePersonForm from "./components/Person/CreatePersonForm";
import { useStoreSelector } from "./store";
import Unauthorized from "./views/auth/Unauthorized";
import AdminNavBar from "./components/UI/AdminNavBar";

const AuthorizedRoute: FC<any> = ({ children, authed: isAuthorized, ...rest }) => {
    if (isAuthorized === true) {
      return <Route {...rest}>{children}</Route>;
    } else {
      return (
        <Redirect to={{ pathname: "/login"}} />
      );
    }
  };

const AdminRoute: FC<any> = ({ children, isAdmin, ...rest }) => {
  if (isAdmin === true) {
    return <Route {...rest}>{children}</Route>;
  } else {
    return (
      <Redirect to={{ pathname: "/login"}} />
    );
  }
};

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkIfLoggedIn());
  }, [dispatch]);

  const isAuthenticated = useStoreSelector((state) => state.auth.isLoggedIn);
  const isAdmin = useStoreSelector((state) => state.auth.isAdmin);

  return (
    <Router>
      <NavBar />
      {isAdmin ? <AdminNavBar /> : <></>}
      <Switch>
        <AdminRoute authed={isAuthenticated} path="/admin">
          <Admin />
        </AdminRoute>
        <AdminRoute authed={isAuthenticated} path="/pagedata">
          <Admin />
        </AdminRoute>
        <AuthorizedRoute admin={isAdmin} path="/login/silent">
          <LoginLanding/>
        </AuthorizedRoute>
        <AuthorizedRoute admin={isAdmin} path="/login/post">
          <LoginLanding/>
        </AuthorizedRoute>
        <Route path="/login/landing">
          <LoginLanding />
        </Route>
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
