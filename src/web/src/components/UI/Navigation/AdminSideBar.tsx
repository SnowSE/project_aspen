import { NavLink, useLocation } from "react-router-dom";
import {
  IoSettingsSharp,
  IoCalendarClear,
  IoHome,
  IoHeart,
} from "react-icons/io5";
import { useState } from "react";
import { alertActions } from "../../../store/alertSlice";
import { useDispatch } from "react-redux";
import styles from './AdminSideBar.module.scss'

const AdminSideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation()

  const onToggleNavBar = () => {
    setIsCollapsed(previous => !previous)
  }
  const displayAlert = () => {
    dispatch(alertActions.displayAlert({ title: "Sample alert", message: "This is how the alert looks", danger: true }));
  }

  const getNavClasses = (pathString: string) => {
    if (location.pathname === pathString) {
      return "d-flex justify-content-center p-1 bg-primary text-success border border-black " + (isCollapsed ? `col-xxl-12 col py-3` : " text-decoration-none")
    }
    else {
      return "d-flex justify-content-center p-1 bg-light text-black border border-black " + (isCollapsed ? `col-xxl-12 col py-3` : " text-decoration-none")
    }
  }

  return (

    <div className={`col-xxl-2 bg-secondary shadow test ${isCollapsed ? 'collapsed-nav' : 'extended-nav'}`}>
      <div id="admin-nav" className="container-fluid d-flex p-0 h-100 flex-column">
        {
          !isCollapsed ? <div className="row text-center py-2 text-light bg-secondary">
            <span className="fs-4">Admin Tools</span>
          </div> : <></>
        }
        <div className="row">
          <NavLink to="/" className={getNavClasses("/")} id={styles.adminLink} exact>
            <IoHome />
            {!isCollapsed && "Home"}
          </NavLink>
          <NavLink to="/admin/donations" className={getNavClasses("/admin/donations")} id={styles.adminLink} exact>
            <IoHeart />
            {!isCollapsed && "Donations"}
          </NavLink>
          <NavLink to="/admin/events" className={getNavClasses("/admin/events")} id={styles.adminLink} exact>
            <IoCalendarClear />
            {!isCollapsed && "Events"}
          </NavLink>
          <NavLink to="/admin/pagedata" className={getNavClasses("/admin/pagedata")} id={styles.adminLink} exact>
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
