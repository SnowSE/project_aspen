import EventDisplay from "../../views/EventDisplay";

import EventInfo from "./EventInfo";
import ButtonBar from "./EventDisplayButtonBar";
import Event from '../Event'
import EventTeam from "./EventTeam";

const MainContainer = () => {
    return(
       
        <div className="container">
            <div className="row">
                <div className="col">
                    <EventDisplay/>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <EventTeam/>
                </div>
                <div className="col">
                    <EventInfo/>
                </div>
            </div>

        </div>
    )
}

export default MainContainer;