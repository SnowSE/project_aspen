import EventModel from "../../models/event";
import EventCard from "../EventCard";
import EventList from "../EventList"

interface Props {
  event: EventModel;
}
const EventInfo = ({ event }: Props) => {
  const charity= "Justins jockies"
  return (
    <div className="card text-center bg-light w-100">
      <h3 className="m-3">Upcoming Event</h3>
      <EventCard event={event}/>

  
    </div>
  );
};

export default EventInfo;
