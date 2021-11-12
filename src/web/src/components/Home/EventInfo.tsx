import EventModel from "../../models/event";
import EventDisplayButtonBar from "./EventDisplayButtonBar";
interface Props {
  event: EventModel;
}
const EventInfo = ({ event }: Props) => {
  return (
    <div className="card text-center bg-info">
      <h3 className="text-light m-3">{event.description}</h3>
      <EventDisplayButtonBar />
    </div>
  );
};

export default EventInfo;
