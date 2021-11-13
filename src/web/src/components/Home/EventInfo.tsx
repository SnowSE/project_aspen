import EventModel from "../../models/event";
import EventCard from "../EventCard";

interface Props {
  event: EventModel;
}
const EventInfo = ({ event }: Props) => {
  return (
    <div className="card text-center bg-light w-100">
      <h3 className="m-3">Upcoming Event</h3>
      <EventCard event={event} />
    </div>
  );
};

export default EventInfo;
