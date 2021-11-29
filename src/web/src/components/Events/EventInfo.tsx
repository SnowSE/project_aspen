import EventModel from "../../models/event";

interface Props {
  event: EventModel;
}
const EventInfo = ({ event }: Props) => {
  return (
    <div className='py-2'>
      <h3>{event.description}</h3>
      <p>For this event the participants will walk to around the USU track in Logan Utah.
        For each mile walked, our contributors will each give a promised amount teams will compete to see which 
        can make the most money in the alloted time.</p>
    </div>
  );
};

export default EventInfo;
