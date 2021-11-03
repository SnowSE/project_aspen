import { useState } from "react";
import EventCard from "./EventCard";
import NewEventForm from "./Forms/NewEventForm";
import { useStoreSelector } from "../store";

function EventList() {
  const events = useStoreSelector((state) => state.event.events);
  const [editing, setEditing] = useState(false);
  return (
    <>
      {events.map((event) => {
        return !editing ? (
          <EventCard event={event} />
        ) : (
          <NewEventForm event={event} isEditing={editing} />
        );
      })}
    </>
  );
}

export default EventList;
