import EventModel from "../../models/event";

interface Props {
  event: EventModel;
}
const EventInfo = ({ event }: Props) => {
  return (
    <div className='py-2'>
      <p>{event.description}</p>
    </div>
  );
};

export default EventInfo;
