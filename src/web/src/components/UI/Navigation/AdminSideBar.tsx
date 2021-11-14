import { NavLink } from "react-router-dom";
import {
  IoSettingsSharp,
  IoAccessibility,
  IoCalendarClear,
  IoHome,
} from "react-icons/io5";

const AdminSideBar = () => {
  return (
    <>
      <div className="d-flex align-items-center p-2  me-md-auto text-decoration-none text-light bg-primary">
        <span className="fs-4">Admin Tools</span>
      </div>
      <ul className="nav nav-tabs flex-column mb-auto">
        <li className="nav-item">
          <NavLink to="/" className="nav-link" exact>
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
