import EventList from "../../components/EventList";
import { getEventList } from "../../store/eventSlice";
import NewEventForm from "../../components/Forms/NewEventForm";

const AdminEvents = () => {
  return <h1>events:</h1>;
  {
    getEventList();
  }
  <EventList />;
  <NewEventForm />;
};

export default AdminEvents;
