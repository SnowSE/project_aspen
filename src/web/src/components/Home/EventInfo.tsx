import EventModel from "../../models/event";
import EventDisplayButtonBar from "./EventDisplayButtonBar";
interface Props {
  event: EventModel;
}
const EventInfo = ({ event }: Props) => {
  return (
    <>
      <h3>{event.description}</h3>
      <h3></h3>
      <EventDisplayButtonBar/>
    </>
  );
};

export default EventInfo;
