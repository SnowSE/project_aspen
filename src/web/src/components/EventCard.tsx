import EventModel from "../models/event";

const EventCard = ({ event }: { event: EventModel }) => {
  console.log(event)
  return (
    <div className="card w-100">
      <h3>{event.description}</h3>
       <h4>{new Date(event.date).toDateString()}</h4>
      <h4>{event.location}</h4>
      
    </div>
     
   
  );
};

export default EventCard;
