import EventModel from "../../models/event";
import EventList from "../EventList"

interface Props {
  event: EventModel;
}
const EventInfo = () => {
  const charity= "Justins jockies"
  return (
    <div className="card text-center bg-light">
      <h3 className="m-3">Upcoming Events</h3>
      <EventList/>

  
    </div>
  );
};

export default EventInfo;
