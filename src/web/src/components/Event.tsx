import EventModel from "../models/event";
import EventList from "./EventList";
import NewEventForm from "./Forms/NewEventForm";

function Event() {
  return (
    <div>
      <h1>Current Events</h1>
      <EventList />
      <h1>New Event</h1>
      <NewEventForm/>
    </div>
  );
}

export default Event;
