import { useEffect } from "react";
import { Route } from "react-router-dom";
import { useHistory } from "react-router-dom";
import EventList from "../components/EventList";
import NewEventForm from "../components/Forms/NewEventForm";
import { useStoreSelector } from "../store";
import { getEventList } from "../store/eventSlice";
import Demo from "./Demo";
import PageDataPage from "./PageDataPage";

export default function Admin() {
  const history = useHistory();
  const user = useStoreSelector((state) => state.auth.user);
  const isAdmin = useStoreSelector((state) => state.auth.isAdmin);
  useEffect(() => {
    async function fetchEvents() {
      console.log("executed");
      getEventList();
    }
    fetchEvents();
  }, []);
  return (
    <div>
      <Route exact path="/admin/">
        <h1> Admin info</h1>
        <small>{JSON.stringify(user)}</small>
        <p>Is Admin: {isAdmin.toString()}</p>
        <h1> Go to demo page</h1>
        <button
          className="btn btn-primary mx-1"
          onClick={() => {
            history.push("/admin/demo");
          }}
        >
          Demo page
        </button>
      </Route>
      <Route exact path="/admin/demo">
        <Demo />
      </Route>
      <Route exact path="/admin/pagedata">
        <PageDataPage />
      </Route>
      <Route exact path="/admin/createEvent">
        <NewEventForm />
      </Route>
      <Route exact path="/admin/events/editEvent"></Route>
      <Route exact path="/admin/events">
        <h1>events:</h1>
        {getEventList()}
        <EventList />
      </Route>
    </div>
  );
}
