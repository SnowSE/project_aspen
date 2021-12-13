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
    <div className="w-100">
      <div className="border-bottom border-5 border-dark m-0">
        <h1 className="text-center"><strong>Events</strong></h1>
      </div>
      {events.map((event) => {
        return <EventCard key={event.id} event={event} />;
      })}
    </div>
  );
}

export default EventList;
