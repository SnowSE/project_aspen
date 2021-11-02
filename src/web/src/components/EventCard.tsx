import EventModel from "../models/event";

const EventCard = ({ event }: { event: EventModel }) => {
  return (
    <>
      <h4>{event.date}</h4>
      <h4>{event.location}</h4>
      <p>{event.description}</p>
      <h4>{event.primaryImageUrl}</h4>
    </>
  );
};

export default EventCard;
