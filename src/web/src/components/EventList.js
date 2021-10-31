import { getEventList } from "../store/EventSlice";
import { useSelector } from "react-redux";
import { useState } from 'react'
import EventCard from "./EventCard";
import NewEventForm from "./Forms/NewEventForm";

function EventList() {
  const events = useSelector(state => state.event.events);
  const [editing, setEditing] = useState(false)
  return (
    <>
      {events.map((event) => {
        return (
            !editing ? <EventCard event={event}/> : <NewEventForm event={event} isEditing={editing}/>
           
        );
      })}
    </>
  );
}

export default EventList;
