import EventModel from "../models/event";

const EventCard = ({ event }: { event: EventModel }) => {
  return (
    <div className="card">
      <h3>{event.description}</h3>
       <h4>{event.date}</h4>
      <h4>{event.location}</h4>
      
    </div>
     
   
  );
};

export default EventCard;
