import { NavLink } from "react-router-dom";
import {
  IoSettingsSharp,
  IoAccessibility,
  IoCalendarClear,
  IoHome,
} from "react-icons/io5";

const AdminSideBar = () => {
  return (
    <div id="admin-nav" className="container-fluid d-flex p-0 h-100 flex-column">
      <div className="row text-center py-2 text-light bg-primary">
        <span className="fs-4">Admin Tools</span>
      </div>
      <div className="row">
        <div className="col"></div>
        <div className="col"></div>
      </div>
      <NavLink to="/" className="row justify-content-center py-2 bg-light text-black border border-black" exact>
        <div className="col-1">
          <IoHome />
        </div>
        <div className="col-auto">
          Home
        </div>
      </NavLink>
      <NavLink to="/admin/people" className="row justify-content-center py-2 bg-light text-black border border-black" exact>
        <div className="col-1">
          <IoAccessibility />
        </div>
        <div className="col-auto">
          People
        </div>
      </NavLink>
      <NavLink to="/admin/events" className="row justify-content-center py-2 bg-light text-black border border-black" exact>
        <div className="col-1">
          <IoCalendarClear />
        </div>
        <div className="col-auto">
          Events
        </div>
      </NavLink>
      <NavLink to="/admin/pagedata" className="row justify-content-center py-2 bg-light text-black border border-black" exact>
        <div className="col-1">
          <IoSettingsSharp />
        </div>
        <div className="col-auto">
          Page Data
        </div>
      </NavLink>
      <div className="row flex-grow-1">
      
      </div>
      <div className="row">
        <button className="btn btn-primary col-12" type="button">
          Expand/Shrink
        </button>
      </div>

    </div>
  );
};

export default AdminSideBar;
