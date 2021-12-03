import EventBanner from "../Events/EventBanner";
import EventInfo from "../Events/EventInfo";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useStoreSelector } from "../../store";
import EventModel from "../../models/event";
import { getEventList, setCurrentEventId } from "../../store/eventSlice";
import EventSponsors from "../Events/EventSponsors";
import EventTeams from "../Events/EventTeams";

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
      console.log('closest event is ', closestEvent);
      dispatch(setCurrentEventId(closestEvent.id));
      //setCurrentEventId(closestEvent.id);
    } else {
      setEvent(dummyEvent);
    }
  }, [events, dispatch]);

  useEffect(() => {
    dispatch(getEventList());
  }, [dispatch]);

  return (
    <div className="container-fluid">
      <div className="row d-flex">
        <div className="col-12 p-0">
          <EventBanner event={event} />
        </div>
        <div className="border border-secondary col-lg-2 mt-3">
          <EventTeams event={event}/>
        </div>
        <div className="col-lg-8 p-3">
          <EventInfo event={event} />
        </div>
        <div className="border border-secondary col-lg-2 mt-3">
          <EventSponsors />
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
