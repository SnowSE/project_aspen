import EventBanner from "./EventBanner";
import EventInfo from "./EventInfo";
import EventTeam from "./EventTeam";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useStoreSelector } from "../../store";
import EventModel from "../../models/event";
import { getEventList } from "../../store/eventSlice";

const MainContainer = () => {
  const events = useStoreSelector((state) => state.event.events);
  const [event, setEvent] = useState<EventModel>(new EventModel());
  const dispatch = useDispatch();
  useEffect(() => {
    const dummyEvent = new EventModel(
      new Date(),
      "",
      "There are currently no upcoming events.",
      ""
    );
    const today = new Date();
    if (events.length !== 0) {
      const closestEvent = events.reduce((a, b) => {
        const diff = new Date(a.date).getTime() - today.getTime();
        return diff > 0 && diff < new Date(b.date).getTime() - today.getTime()
          ? a
          : b;
      });
      setEvent(closestEvent);
    } else {
      setEvent(dummyEvent);
    }
  }, [events]);

  useEffect(() => {
    dispatch(getEventList());
  }, [dispatch]);

  return (
    <div className="container">
      <div className="row d-flex">
        <div className="col">
          <EventBanner event={event} />
        </div>
      </div>
      <div className="row">
        <div className="col d-flex w-100">
          <EventTeam />
        </div>
        <div className="col d-flex w-100">
          <EventInfo event={event} />
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
