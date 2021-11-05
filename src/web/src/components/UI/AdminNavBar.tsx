import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function AdminNavBar() {
  const [showAdminNavBar, setShowAdminNavBar] = useState<boolean>(false);

  const onButtonClick = () => {
    setShowAdminNavBar(!showAdminNavBar);
  };
  return (
    <>
      {showAdminNavBar ? (
        <nav className="navbar navbar-light bg-success">
          <div className="container-fluid">
            <a className="navbar-brand">Admin Tools</a>
            <div>
              <label>Events: </label>
              <button className="btn btn-primary mx-1">Create Event</button>
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
