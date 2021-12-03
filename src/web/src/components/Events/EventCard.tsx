import EventModel from "../../models/event";

const EventCard = ({ event }: { event: EventModel }) => {
  return (
    <div className="row border-bottom bg-light">
      <div className="col-8">
        <p className="h2"><strong>{event.title ?? "No Title"}</strong></p>
        <p><strong>Description:</strong> {event.description}</p>
      </div>
      <div className="col-4">
        <p className="h5"><strong>Date: {new Date(event.date).toDateString()}</strong></p>
        <p className="h5"><strong>Location: {event.location}</strong></p>
        <p className="h5"><strong>Donation Target: {event.donationTarget}</strong></p>
      </div>
    </div>
  );
};

export default EventCard;
