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
import { useStoreSelector } from "./store";
import PageDataPage from "./views/PageDataPage";
import Admin from "./views/Admin";
import Unauthorized from "./views/auth/Unauthorized";
import AdminNavBar from "./components/UI/AdminNavBar";

const AuthorizedRoute: FC<any> = ({ children, isAuthorized, ...rest }) => {
    if (isAuthorized === true) {
      return <Route {...rest}>{children}</Route>;
    } else {
      return (
        <Redirect to={{ pathname: "/login"}} />
      );
    }
  };

const AdminRoute: FC<any> = ({ children, isAdmin, ...rest }) => {
  console.log(isAdmin)
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
  const isAdmin = useStoreSelector((state) => state.auth.isAdmin);
  useEffect(() => {
    dispatch(checkIfLoggedIn());
  }, [dispatch]);

  const isAuthenticated = useStoreSelector((state) => state.auth.isLoggedIn);

  return (
    <Router>
      <NavBar />
      {isAdmin ? <AdminNavBar /> : <></>}
      <Switch>
        <AdminRoute isAdmin={isAdmin} path="/admin">
          <Admin />
        </AdminRoute>
        <AdminRoute isAdmin={isAdmin} path="/pagedata">
          <Admin />
        </AdminRoute>
        <AuthorizedRoute isAuthorized={isAuthenticated} path="/login/silent">
          <LoginLanding/>
        </AuthorizedRoute>
        <AuthorizedRoute isAuthorized={isAuthenticated} path="/login/post">
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
