import EventDisplay from "./EventDisplay";
import MessageBoard from "./MessageBoard";
import ButtonBar from "./ButtonBar";

const MainContainer = () => {
    return(
        <div className="container">
            <div className="row">
                <div className="col-md-9">
                    <MessageBoard message={"Welcome Earthlings!"}/>
                </div>
                <div className="col-md-3 col-sm-4">
                    <EventDisplay />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <ButtonBar/>
                </div>
            </div>

        </div>
    )
}

export default MainContainer;