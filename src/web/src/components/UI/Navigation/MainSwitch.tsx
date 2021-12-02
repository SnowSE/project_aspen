import { Switch, Route } from "react-router-dom";
import { Home } from "../../../views/Home";
import { LoginLanding } from "../../../views/auth/LoginLanding";
import { useDispatch } from "react-redux";
import { FC, useEffect } from "react";
import { checkIfLoggedIn } from "../../../store/authSlice";
import { useStoreSelector } from "../../../store";
import Admin from "../../../views/Admin/Admin";
import { AuthService } from "../../../services/authService";
import UnAuthorized from "../../../views/UnAuthorized";
import TeamRegistrationPage from "../../../views/TeamRegistrationPage";
// import NewEventForm from "../../../components/Forms/NewEventForm";
// import EventDisplay from "../../../views/EventDisplay";
import { LogoutLanding } from "../../../views/auth/LogoutLanding";
import JoinTeamPage from "../../../views/JoinTeamPage";
import DonationPage from "../../../views/DonationPage";

const AuthorizedRoute: FC<any> = ({
  children,
  isAuthorized,
  ...rest
}) => {
  if (!isAuthorized) {
    AuthService.signinRedirect();
    return <Route {...rest}>{children}</Route>;
  }
  else{
    return <Route {...rest}>{children}</Route>;
  }
  
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

const MainSwitch = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkIfLoggedIn());
  }, [dispatch]);
  const isAuthenticated = useStoreSelector((state) => state.auth.isLoggedIn);
  const isAdmin = useStoreSelector((state) => state.auth.isAdmin);
  return (
    <Switch>
      {/* <AdminRoute isAdmin={isAdmin} path="/admin/events">
        <EventDisplay />
      </AdminRoute> */}
      {/* <AdminRoute isAdmin={isAdmin} path="/admin/createnewevent">
        <NewEventForm />
      </AdminRoute> */}
      <AdminRoute isAdmin={isAdmin} path="/admin">
        <Admin />
      </AdminRoute>
      <AuthorizedRoute isAuthorized={isAuthenticated} path="/login/silent">
        <LoginLanding />
      </AuthorizedRoute>
      <AuthorizedRoute isAuthorized={isAuthenticated} path="/login/post">
        <LoginLanding />
      </AuthorizedRoute>
      
       <AuthorizedRoute isAuthorized={isAuthenticated} path="/teamregistration">
        <TeamRegistrationPage />
      </AuthorizedRoute>
      <AuthorizedRoute isAuthorized={isAuthenticated} path="/jointeam">
        <JoinTeamPage/>
      </AuthorizedRoute> 

      <Route path="/login/landing">
        <LoginLanding />
      </Route>
      <Route path="/logout/post" exact>
        <LogoutLanding />
      </Route>
      <Route path="/donations">
        <DonationPage/>
      </Route>
      <Route exact path="/">
        <Home />
      </Route>
      
    </Switch>
  );
};

export default MainSwitch;
