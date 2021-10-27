import { useCallback, useContext, useEffect, useState } from "react";
import { AdminApiButton } from "./components/AdminApiButton";
import { ApiButton } from "./components/ApiButton";
import { NavBar } from "./components/NavBar";
import { AuthContext } from "./store/AuthContext";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const context = useContext(AuthContext);

  const loginCallback = useCallback(() => {
    context.ensureLoggedIn().then((u) => {
      setIsLoggedIn(true);
      setUser(u);
    });
  }, [context]);

  useEffect(() => {
    loginCallback();
  }, [loginCallback]);

  return (
    <div>
      {!isLoggedIn && <div>Not Logged in</div>}
      {isLoggedIn && user && (
        <div>
          <NavBar />
          {JSON.stringify(user.profile)}
          <br />
          <ApiButton />
          <hr />
          <AdminApiButton />
          <button onClick = {apiClickHandler}>Button</button>
        </div>
      )}
    </div>
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
