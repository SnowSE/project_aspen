import { NavLink } from "react-router-dom";
import {
  IoSettingsSharp,
  IoAccessibility,
  IoCalendarClear,
  IoHome,
} from "react-icons/io5";
import { useState } from "react";

const AdminSideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const onToggleNavBar = () => {
    setIsCollapsed(previous => !previous)
  }

  const genericClasses = "d-flex justify-content-center py-2 bg-light text-black border border-black" + (isCollapsed ? `col-sm col-xxl-12 mobile-col` : " text-decoration-none")

  return (
    <div className="col-xxl-2 bg-secondary shadow" id={isCollapsed ? 'collapsed' : ''}>
      <div id="admin-nav" className="container-fluid d-flex p-0 h-100 flex-column">
        <div className="row text-center py-2 text-light bg-primary">
          <span className="fs-4">{!isCollapsed && "Admin Tools"}</span>
        </div>
        <div className="row">
          <div className="col"></div>
          <div className="col"></div>
        </div>
        <div className="row">
          <NavLink to="/" className={genericClasses} exact>
            <IoHome />
            {!isCollapsed && "Home"}
          </NavLink>
          <NavLink to="/admin/people" className={genericClasses} exact>
            <IoAccessibility />
            {!isCollapsed && "People"}
          </NavLink>
          <NavLink to="/admin/events" className={genericClasses} exact>
            <IoCalendarClear />
            {!isCollapsed && "Events"}
          </NavLink>
          <NavLink to="/admin/pagedata" className={genericClasses} exact>
            <IoSettingsSharp />
            {!isCollapsed && "Page Data"}
          </NavLink>
        </div>
        <div className="row flex-grow-1"></div>
        <div className="row">
          <button id="responsive-expand-button" className="btn btn-primary col-12" type="button" onClick={onToggleNavBar}>
            {isCollapsed ? 'expand' : 'collapse'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default AdminSideBar;
