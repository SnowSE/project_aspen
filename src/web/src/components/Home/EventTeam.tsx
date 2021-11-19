import { NavLink } from "react-router-dom";
import { useStoreSelector } from "../../store";
import { AuthService } from "../../services/authService";

const EventTeam = () => {

    const isLoggedIn = useStoreSelector((state) => state.auth.isLoggedIn);
    const loginHandler = () => {
        AuthService.signinRedirect();
      };

    const img_url = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.hearingcarecentres.co.uk%2Fwp-content%2Fuploads%2F2017%2F03%2FCharity-banner.png&f=1&nofb=1";
    const info = "For this event the participants will walk to around the USU track in Logan Utah. For each mile walked, our contributors will each give a promised amount teams will compete to see which can make the most money in the alloted time.";
    return (
        <div className="card text-center bg-light">
            <img src={img_url} alt="team logo" width="550" height="200" className="pb-3"/>
            <hr/>
            <p className="card h-100">{info}</p>
            {isLoggedIn? <div className="my-3">
                <NavLink to="/jointeam"  className="btn btn-primary me-1">Join Team</NavLink>
                <NavLink to="/teamregistration" className="btn btn-primary ms-1">Create Team</NavLink>
            </div>: <div className="my-3">
                <button onClick={loginHandler} className="btn btn-primary me-1">Join Team</button>
                <button onClick={loginHandler} className="btn btn-primary ms-1">Create Team</button>
            </div> }
            
            
        </div>
      );
    }
export default EventTeam;
