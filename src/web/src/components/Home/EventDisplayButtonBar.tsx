import { AdminApiButton } from "../AdminApiButton";
import { ApiButton } from "../ApiButton";
import { useStoreSelector } from "../../store";
import { useHistory } from 'react-router-dom'

const EventDisplayButtonBar = () => {
  const authId = useStoreSelector(state => state.person.selectedPerson.authID);
  const events = useStoreSelector(state => state.event.events);
  const history = useHistory();

  const createNewEventHandler = () => {
    history.push("/createnewevent");
    
  }

  return (
    <nav className="navbar navbar-expand-lg fixed-bottom navbar-dark bg-dark">
    <div className="container-fluid">
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          {
           authId === "" && events.length === 0 && <></>
          }
          {
            authId === "" && events.length > 0 && <><button>Register</button> <button>Donate</button></>
          }
          { authId !== "" && events.length === 0 && <button onClick={createNewEventHandler}>Create New Event</button> }
        </div>
      </div>
    </div>
  </nav>
  );
};
export default EventDisplayButtonBar;

