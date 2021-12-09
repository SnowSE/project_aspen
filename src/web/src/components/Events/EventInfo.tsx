import { NavLink } from "react-router-dom";
import EventModel from "../../models/event";

interface Props {
  event: EventModel;
}
const EventInfo = ({ event }: Props) => {
  const donateUrl = "/donate/" + event.id
  return (
    <div className='py-2'>
      <p>Event description: {event.description}</p>
      <div className="d-flex justify-content-center">
        <NavLink to={donateUrl} className="btn btn-primary me-1">Donate</NavLink>
      </div>
    </div>
  );
};

export default EventInfo;
