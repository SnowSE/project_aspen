import { NavLink } from "react-router-dom";

const EventTeam = () => {

    
    const info = "For this event the participants will walk to around the USU track in Logan Utah. For each mile walked, our contributors will each give a promised amount teams will compete to see which can make the most money in the alloted time.";
    return (
        <div className="card text-center bg-light">
            <p className="card h-100">{info}</p>
            <div className="my-3">
                <NavLink to="/jointeam"  className="btn btn-primary me-1">Join Team</NavLink>
                <NavLink to="/teamregistration" className="btn btn-primary ms-1">Create Team</NavLink>
            </div>
        </div>
      );
    }
export default EventTeam;
