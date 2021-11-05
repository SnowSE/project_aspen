import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useStoreSelector } from "../../store";
import { getEventList } from "../../store/eventSlice";
import EventModel from "../../models/event";
import EventInfo from "./EventInfo";

const EventDisplay = () => {
  const events = useStoreSelector((state) => state.event.events);
  const [event, setEvent] = useState<EventModel>(new EventModel());
  useEffect(() => {
    dispatch(getEventList());
    const dummyEvent = new EventModel(
      new Date(),
      "",
      "There are currently no upcoming events.",
      ""
    );
    const today = new Date();
    if (events.length != 0) {
      const closestEvent = events.reduce((a, b) => {
        const diff = new Date(a.date).getTime() - today.getTime();
        return diff > 0 && diff < new Date(b.date).getTime() - today.getTime()
          ? a
          : b;
      });

      if (typeof closestEvent !== "undefined") {
        setEvent(closestEvent);
      } else {
        setEvent(dummyEvent);
      }
    }
  }, [events]);

  const dispatch = useDispatch();

  return (
    <div>
      {events.length > 0 ? (
        <>
          <EventInfo event={event} />
        </>
      ) : (
        <>
          <EventInfo event={event} />
        </>
      )}
    </div>
  );
};
export default EventDisplay;
