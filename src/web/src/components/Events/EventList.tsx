import EventCard from "./EventCard";
import { useStoreSelector } from "../../store";
import { getEventList } from "../../store/eventSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

function EventList() {
  const events = useStoreSelector((state) => state.event.events);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEventList());
  }, [dispatch]);
  return (
    <>
      <h1>events:</h1>
      {events.map((event) => {
        return <EventCard event={event} />;
      })}
    </>
  );
}

export default EventList;
