import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Home } from "./views/Home";
import Event from "./components/Event";
import { LoginLanding } from "./views/auth/LoginLanding";
import { LogoutLanding } from "./views/auth/LogoutLanding";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkIfLoggedIn } from "./store/AuthSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkIfLoggedIn());
  }, [dispatch]);
  
  return (
    <Router>
      <Event></Event>
      <NavBar />
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
