import { NavLink } from "react-router-dom";
import { useState } from "react";
import {
  IoSettingsSharp,
  IoAccessibility,
  IoCalendarClear,
  IoHome,
} from "react-icons/io5";
const AdminSideBar = () => {
  const [current, setIsCurrent] = useState();
  return (
    <>
      <div className="d-flex align-items-center p-2  me-md-auto text-decoration-none text-light">
        <span className="fs-4">Admin Tools</span>
      </div>
      <ul className="nav nav-tabs flex-column mb-auto">
        <li className="nav-item">
          <NavLink to="/" className="nav-link ">
            <IoHome className="me-1" />
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/admin/people" className="nav-link ">
            <IoAccessibility className="me-1" />
            People
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/events" className="nav-link ">
            <IoCalendarClear className="me-1" />
            Events
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/pagedata" className="nav-link">
            <IoSettingsSharp className="me-1" />
            Settings (Page Data)
          </NavLink>
        </li>
      </ul>
    </>
  );
};

export default AdminSideBar;

{
  /* <div classNameName="flex-shrink-0 p-3 bg-white">
<span classNameName="fs-5 fw-semibold">Admin Tools</span>
<ul classNameName="list-unstyled ps-0">
  <li classNameName="mb-1">
    <button
      classNameName="btn btn-toggle align-items-center rounded collapsed"
      data-bs-toggle="collapse"
      data-bs-target="#home-collapse"
      aria-expanded="false"
    >
      Events
    </button>
    <div classNameName="collapse" id="home-collapse">
      <ul classNameName="btn-toggle-nav list-unstyled fw-normal pb-1 small">
        <li>
          <NavLink to="/admin/createEvent" classNameName="link-dark rounded">
            Create an Event
          </NavLink>
        </li>
        <li>
          <NavLink classNameName="link-dark rounded" to="/admin/events">
            Manage your Events
          </NavLink>
        </li>
      </ul>
    </div>
  </li>
</ul>
</div> */
}
