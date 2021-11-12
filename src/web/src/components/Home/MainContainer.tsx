import EventDisplay from "../../views/EventDisplay";
import MessageBoard from "./MessageBoard";

const MainContainer = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <EventDisplay />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <MessageBoard message={"Welcome!"} />
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
