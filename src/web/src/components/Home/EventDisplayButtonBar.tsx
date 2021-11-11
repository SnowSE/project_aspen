import { AdminApiButton } from "../AdminApiButton";
import { ApiButton } from "../ApiButton";
import { useStoreSelector } from "../../store";
import {NavLink} from "react-router-dom"

const EventDisplayButtonBar = () => {
  const isAdmin = useStoreSelector((state) => state.auth.isAdmin);
  const isLoggedIn = useStoreSelector((state) => state.auth.isLoggedIn);
  const events = useStoreSelector((state) => state.event.events);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
      <div className="container-fluid">
          <div className="d-flex">
            {/* {!isLoggedIn && isAdmin && <></>} error page, how would anyone get here, really? */}
            {!isLoggedIn && !isAdmin && events.length === 0 && <><NavLink className="btn btn-light" to="/nowhere" >Example</NavLink></>}
           
            {isLoggedIn && !isAdmin && events.length === 0 && <></>}
            {isLoggedIn && !isAdmin && events.length > 0 && (
              <>
                <NavLink className="btn btn-primary" to="/teams">Join a Team</NavLink> <NavLink className="btn btn-primary" to="/donations">Donate</NavLink>
              </>
            )}
            {/* {isLoggedIn && isAdmin && events.length === 0 && (
              <NavLink className="btn btn-primary" to="/admin/createnewevent">Create New Event</NavLink>
            )} */}
            {isLoggedIn && isAdmin && events.length > 0 && (
              <>
                <NavLink className="btn btn-primary" to="/donations">Donate</NavLink>
                {/* <NavLink className="btn btn-primary" to="/admin/createnewevent">
                  Create New Event
                </NavLink> */}
              </>
            )}
          </div>
      </div>
    </nav>
  );
};
export default EventDisplayButtonBar;
