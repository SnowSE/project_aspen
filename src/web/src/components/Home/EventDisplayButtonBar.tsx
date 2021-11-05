import { AdminApiButton } from "../AdminApiButton";
import { ApiButton } from "../ApiButton";
import { useStoreSelector } from "../../store";
import { useHistory } from "react-router-dom";

const EventDisplayButtonBar = () => {
  const isAdmin = useStoreSelector((state) => state.auth.isAdmin);
  const isLoggedIn = useStoreSelector((state) => state.auth.isLoggedIn);
  const events = useStoreSelector((state) => state.event.events);
  const history = useHistory();

  const createNewEventRedirect = () => {
    history.push("/admin/createnewevent");
  };
  const donationPageRedirect = () => {
    history.push("/donations");
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-bottom navbar-dark bg-dark">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            {/* {!isLoggedIn && isAdmin && <></>} error page, how would anyone get here, really? */}
            {!isLoggedIn && !isAdmin && events.length === 0 && <></>}
            {isLoggedIn && !isAdmin && events.length === 0 && <></>}
            {isLoggedIn && !isAdmin && events.length > 0 && (
              <>
                <button>Register</button> <button>Donate</button>
              </>
            )}
            {isLoggedIn && isAdmin && events.length === 0 && (
              <button onClick={createNewEventRedirect}>Create New Event</button>
            )}
            {isLoggedIn && isAdmin && events.length > 0 && (
              <>
                <button onClick={donationPageRedirect}>Donate</button>
                <button onClick={createNewEventRedirect}>
                  Create New Event
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
export default EventDisplayButtonBar;
