import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

export default function AdminNavBar() {
  const history = useHistory()
  const [showAdminNavBar, setShowAdminNavBar] = useState<boolean>(false);

  const onButtonClick = () => {
    setShowAdminNavBar(!showAdminNavBar);
  };
  return (
    <>
      {showAdminNavBar ? (
        <nav className="navbar navbar-light bg-success">
          <div className="container-fluid">
            <span className="navbar-brand">Admin Tools</span>
            <div>
              <label>Events: </label>
              <button
                className="btn btn-primary mx-1"
                onClick={() => {
                  history.push("/admin/createEvent");
                }}
              >
                Create Event
              </button>
              <button className="btn btn-primary mx-1">Update Event</button>
              <button className="btn btn-primary mx-1">Delete Event</button>
            </div>
            <button className="btn btn-primary" onClick={onButtonClick}>
              Hide Admin Tools
            </button>
          </div>
        </nav>
      ) : (
        <button className="btn btn-primary" onClick={onButtonClick}>
          Show Admin Tools
        </button>
      )}
    </>
  );
}
