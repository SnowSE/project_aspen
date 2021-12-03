import { NavLink } from "react-router-dom";
import {
  IoSettingsSharp,
  IoAccessibility,
  IoCalendarClear,
  IoHome,
  IoHeart,
} from "react-icons/io5";
import { useState } from "react";
import { alertActions } from "../../../store/alertSlice";
import { useDispatch } from "react-redux";

const AdminSideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const dispatch = useDispatch();

  const onToggleNavBar = () => {
    setIsCollapsed(previous => !previous)
  }
  const displayAlert = () => {
    dispatch(alertActions.displayAlert({ title: "Sample alert", message: "This is how the alert looks", danger: true }));
  }

  const genericClasses = "d-flex justify-content-center py-2 bg-light text-black border border-black " + (isCollapsed ? `col-xxl-12 col` : " text-decoration-none")

  return (
    <div className={`col-xxl-2 bg-secondary shadow test ${isCollapsed ? 'collapsed-nav' : 'extended-nav'}`}>
      <div id="admin-nav" className="container-fluid d-flex p-0 h-100 flex-column">
        <div className="row text-center py-2 text-light bg-primary">
          <span className="fs-4">{!isCollapsed && "Admin Tools"}</span>
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
          <NavLink to="/admin/donations" className={genericClasses} exact>
            <IoHeart />
            {!isCollapsed && "Donations"}
          </NavLink>
          <NavLink to="/admin/events" className={genericClasses} exact>
            <IoCalendarClear />
            {!isCollapsed && "Events"}
          </NavLink>
          <NavLink to="/admin/pagedata" className={genericClasses} exact>
            <IoSettingsSharp />
            {!isCollapsed && "Page Data"}
          </NavLink>
          <button id="responsive-expand-button" className="btn btn-danger" type="button" onClick={displayAlert}>
            ⚠
          </button>
        </div>
        <div className="row flex-grow-1"></div>
        <div className="row">
          <button id="responsive-expand-button" className="btn btn-dark col-12" type="button" onClick={onToggleNavBar}>
            {isCollapsed ? '⇲' : '⇱'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSideBar;
