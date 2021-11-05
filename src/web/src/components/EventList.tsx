import { useState } from "react";
import EventCard from "./EventCard";
import NewEventForm from "./Forms/NewEventForm";
import { useStoreSelector } from "../store";

function EventList() {
  const events = useStoreSelector((state) => state.event.events);
  console.log("Events " +events)
  return (
    <>
      {events.map((event) => {
        return 
          <EventCard event={event} />
      })}
    </>
  );
}

export default EventList;
