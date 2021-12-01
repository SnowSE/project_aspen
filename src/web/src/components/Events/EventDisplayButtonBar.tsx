import { useStoreSelector } from "../../store";
import { NavLink } from "react-router-dom";

const EventDisplayButtonBar = () => {
  const isAdmin = useStoreSelector((state) => state.auth.isAdmin);
  const isLoggedIn = useStoreSelector((state) => state.auth.isLoggedIn);
  const events = useStoreSelector((state) => state.event.events);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
      <div className="container-fluid">

          <div className="d-flex">
            {!isLoggedIn && !isAdmin && events.length === 0 && <><NavLink className="btn btn-light" to="/nowhere" >Example</NavLink></>}

            {isLoggedIn && isAdmin && events.length > 0 && (
              <>
                <NavLink className="btn btn-primary" to="/donations">Donate</NavLink>
              </>
            )}
          </div>

      </div>
    </nav>
  );
};
export default EventDisplayButtonBar;
