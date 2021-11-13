import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Home } from "./views/Home";
import { LoginLanding } from "./views/auth/LoginLanding";
import { useDispatch } from "react-redux";
import { FC, useEffect } from "react";
import { checkIfLoggedIn } from "./store/authSlice";
import { useStoreSelector } from "./store";
import AdminSideBar from "./components/UI/AdminSideBar";
import Admin from "./views/Admin";
import { AuthService } from "./services/authService";
import UnAuthorized from "./views/UnAuthorized";

import PersonPage from "./views/PersonPage";
import NewEventForm from "./components/Forms/NewEventForm";
import EventDisplay from "./views/EventDisplay";

const AuthorizedRoute: FC<any> = ({
  children,
  isAuthorized,
  ...rest
}) => {
  if (!isAuthorized) {
    console.log(isAuthorized)
    AuthService.signinRedirect();
    return <div></div>
  }
  console.log(isAuthorized)
  return <Route {...rest}>{children}</Route>;
};

const AdminRoute: FC<any> = ({ children, isAdmin, ...rest }) => {
  console.log(isAdmin);
  if (isAdmin === true) {
    return <Route {...rest}>{children}</Route>;
  } else {
    return (
      <Route {...rest}>
        <UnAuthorized />
      </Route>
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
    <Router basename={`${process.env.PUBLIC_URL}`}>
      <NavBar />
      {isAdmin && (
        <div className="col-md-1 bg-primary">
          <AdminSideBar />
        </div>
      )}
      <Switch>
        <AdminRoute isAdmin={isAdmin} path="/admin/events">
          <EventDisplay />
        </AdminRoute>
        <AdminRoute isAdmin={isAdmin} path="/admin/createnewevent">
          <NewEventForm />
        </AdminRoute>

        <AdminRoute isAdmin={isAdmin} path="/admin">
          <Admin />
        </AdminRoute>
        <AdminRoute isAdmin={isAdmin} path="/pagedata">
          <Admin />
        </AdminRoute>
        <AuthorizedRoute isAuthorized={isAuthenticated} path="/login/silent">
          <LoginLanding />
        </AuthorizedRoute>
        <AuthorizedRoute isAuthorized={isAuthenticated} path="/login/post">
          <LoginLanding />
        </AuthorizedRoute>
        <Route path="/login/landing">
          <LoginLanding />
        </Route>
        <AuthorizedRoute isAuthorized={isAuthenticated} path="/register">
            <PersonPage />
        </AuthorizedRoute>
        <Route exact path="/">
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
