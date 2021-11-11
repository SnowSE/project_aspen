import EventModel from "../../models/event";
import EventDisplayButtonBar from "./EventDisplayButtonBar";
interface Props {
  event: EventModel;
}
const EventBanner = ({ event }: Props) => {
  const charity= "Justins jockies"
  return (
    <div className="card text-center bg-light">
      {/* <img src={event.primaryImageUrl} alt="event background" width="500" height="500"/> */}
      <h3 className="m-3">{event.description}</h3>
      <EventDisplayButtonBar/>
      <div className="centered"><strong> Learn more about {charity}</strong></div>
    </div>
  );
};

export default EventBanner;
