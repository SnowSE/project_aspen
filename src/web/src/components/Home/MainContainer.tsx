import EventDisplay from "./EventDisplay";
import MessageBoard from "./MessageBoard";

const MainContainer = () => {
    return(
        <div className="container">
            <div className="row">
                <div className="col-md-9">
                    <MessageBoard message={"Welcome Earthlings!"}/>
                </div>
                <div className="col-md-3">
                    <EventDisplay />
                </div>
            </div>

        </div>
    )
}

export default MainContainer;