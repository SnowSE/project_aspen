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
import { AuthService } from "./services/authService";
import UnAuthorized from "./views/UnAuthorized";
import AdminNavBar from "./components/UI/AdminNavBar";
import PersonPage from "./views/PersonPage";

const AuthorizedRoute: FC<any> = ({
  children,
  authed: isAuthorized,
  ...rest
}) => {
  if (!isAuthorized) {
    AuthService.signinRedirect();
  }
  return <Route {...rest}>{children}</Route>;
};

const AdminRoute: FC<any> = ({ children, isAdmin, ...rest }) => {
  console.log(isAdmin)
  if (isAdmin === true) {
    return <Route {...rest}>{children}</Route>;
  } else {
    return <Route {...rest}><UnAuthorized/></Route>;
  }
};

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkIfLoggedIn());
  }, [dispatch]);
  const isAuthenticated = useStoreSelector((state) => state.auth.isLoggedIn);
  const isAdmin = useStoreSelector((state) => state.auth.isAdmin)

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
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/register">
          <PersonPage />
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
