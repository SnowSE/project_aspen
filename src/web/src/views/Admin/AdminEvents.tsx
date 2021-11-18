import EventList from "../../components/Events/EventList";
import NewEventForm from "../../components/Forms/NewEventForm";
import { useState } from "react";
import { IoAdd } from "react-icons/io5";
import { TiCancel } from "react-icons/ti";

const AdminEvents = () => {
  const [addNew, setAddNew] = useState(false);
  return (
    <>
      <EventList />
      {addNew ? (
        <div className="mt-3">
          <NewEventForm />
          <button
            className="btn btn-transparent"
            onClick={() => {
              setAddNew(!addNew);
            }}
          >
            <TiCancel size="2em" />
          </button>
        </div>
      ) : (
        <button
          className="btn btn-transparent align-items-center mt-2"
          onClick={() => {
            setAddNew(!addNew);
          }}
        >
          Add Event
          <IoAdd size="2em" />
        </button>
      )}
    </>
  );
};

export default AdminEvents;
